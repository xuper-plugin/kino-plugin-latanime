// LatAnime: anime of latanime.org in Spanish (Latino, Castellano or subtitled). The site is plain HTML, read by site.js. Kino
// gets the usual functions (home, browse, search, episodes, resolve) and its own browse screen with a slider, tabs and search.
// A server is an embed page of a third-party player: the extractors open it and find the stream.

import { extractorFor } from "./extractors/index.js";
import { UA } from "./util/http.js";
import { SITE, parseCards, hasNext, parseAnime, parsePlayers, seriesOfEpisode } from "./site.js";
import { makeBrowse } from "./browse/index.js";
import { t } from "./i18n.js";

// Kino waits for every request a call left running before it delivers the call's answer; ask it to drop them once the call settles.
globalThis.__kinoDropPendingFetches = true;

const BRAND = "LatAnime";
const MAX_COPIES = 8;
const TRY_AT_ONCE = 3; // servers opened together when an episode is played
const CALL_MS = 16000;
const SLIDE_DETAILS = 5; // titles whose page is read to give the slider a synopsis and a picture

// Every list the plugin shows is one of these refs: a listing of the site, with a title in both languages.
const LISTS = {
  emision: { path: "/emision", es: "En emisión", en: "Airing now" },
  animes: { path: "/animes", es: "Todos los animes", en: "All anime" },
  "c:Película": { cat: "Película", es: "Películas", en: "Movies" },
  "c:Película Latino": { cat: "Película Latino", es: "Películas en latino", en: "Movies in Latino" },
  "c:Película Castellano": { cat: "Película Castellano", es: "Películas en castellano", en: "Movies in Castilian" },
  "c:pelicula-1080p": { cat: "pelicula-1080p", es: "Películas en 1080p", en: "1080p movies" },
  "c:latino": { cat: "latino", es: "Doblado al latino", en: "Dubbed in Latino" },
  "c:castellano": { cat: "castellano", es: "Doblado al castellano", en: "Dubbed in Castilian" },
  "c:ova": { cat: "ova", es: "OVAs", en: "OVAs" },
  "c:donghua": { cat: "donghua", es: "Donghua", en: "Donghua" },
  "g:accion": { genre: "accion", es: "Acción", en: "Action" },
  "g:aventura": { genre: "aventura", es: "Aventura", en: "Adventure" },
  "g:comedia": { genre: "comedia", es: "Comedia", en: "Comedy" },
  "g:drama": { genre: "drama", es: "Drama", en: "Drama" },
  "g:fantasia": { genre: "fantasia", es: "Fantasía", en: "Fantasy" },
  "g:romance": { genre: "romance", es: "Romance", en: "Romance" },
  "g:shonen": { genre: "shonen", es: "Shonen", en: "Shonen" },
  "g:sobrenatural": { genre: "sobrenatural", es: "Sobrenatural", en: "Supernatural" },
  "g:ciencia-ficcion": { genre: "ciencia-ficcion", es: "Ciencia ficción", en: "Sci-fi" },
  "g:escolares": { genre: "escolares", es: "Escolares", en: "School" },
};

// The tabs of the screen and the lists each one shows (the first row of "inicio" also feeds the slider).
export const TABS = [
  { id: "inicio", es: "Inicio", en: "Home", lists: ["emision", "animes", "c:Película", "g:accion", "g:comedia", "g:romance"] },
  { id: "emision", es: "En emisión", en: "Airing", lists: ["emision", "c:latino", "c:castellano", "c:ova"] },
  { id: "peliculas", es: "Películas", en: "Movies", lists: ["c:Película", "c:Película Latino", "c:Película Castellano", "c:pelicula-1080p"] },
  { id: "generos", es: "Géneros", en: "Genres", lists: ["g:accion", "g:aventura", "g:comedia", "g:drama", "g:fantasia", "g:shonen", "g:sobrenatural", "g:ciencia-ficcion"] },
];

/** The address of a listing page: `ref` names the list, `page` the page of it. */
export function listUrl(ref, page = 1) {
  const l = LISTS[ref];
  if (!l) return null;
  let url;
  if (l.path) url = SITE + l.path;
  else if (l.cat) url = SITE + "/animes?fecha=false&genero=false&letra=false&categoria=" + encodeURIComponent(l.cat);
  else url = SITE + "/animes?fecha=false&genero=" + encodeURIComponent(l.genre) + "&letra=false&categoria=false";
  return page > 1 ? url + (url.includes("?") ? "&" : "?") + "page=" + page : url;
}

async function pageText(url) {
  const r = await kino.fetch(url, { headers: { "User-Agent": UA, Accept: "text/html" } });
  if (!r.ok) throw kino.error("unavailable", url + " answered " + r.status, { userMessage: t(kino, "siteDown") });
  return r.text();
}

async function listing(ref, page = 1) {
  const url = listUrl(ref, page);
  if (!url) return { items: [], next: undefined };
  const html = await pageText(url);
  return { items: parseCards(html), next: hasNext(html) ? String(page + 1) : undefined };
}

// A row id is letters, digits, "-" and "_": "g:accion" (the list's ref, kept as the row's `ref`) was dropped by Kino, leaving the Home with two rows.
const rowOf = (ref, items) => ({ id: ref.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "-"), title: LISTS[ref].es, titleEn: LISTS[ref].en, ref, items });

/** Waits for `work` in short sleeps until it settles or `ms` pass; never rejects. */
async function settledWithin(ms, work) {
  let done = false;
  Promise.resolve(work).then(() => { done = true; }, () => { done = true; });
  const end = Date.now() + ms;
  while (!done && Date.now() < end) await kino.sleep(Math.min(250, Math.max(1, end - Date.now())));
  return done;
}

/** Kino cuts a call at 20 s: the lists still loading by this time are left off and the ones that loaded are shown. */
const ROWS_BUDGET_MS = 11000;

/** The rows of these lists, asked together; each one that fails or is slow is left out. */
async function rowsOfLists(refs) {
  const out = refs.map(() => null);
  const all = Promise.all(refs.map(async (ref, i) => {
    try { const p = await listing(ref, 1); out[i] = p.items.length ? rowOf(ref, p.items) : null; } catch (_) { /* left out */ }
  }));
  await settledWithin(ROWS_BUDGET_MS, all);
  return out.filter(Boolean);
}

export async function home() {
  const out = await rowsOfLists(["emision", "animes", "c:Película", "g:accion", "g:comedia"]);
  if (!out.length) throw kino.error("unavailable", "no list answered", { userMessage: t(kino, "siteDown") });
  return out.map(({ titleEn, ...row }) => row);
}

export async function browse(ref, cursor) {
  const page = Math.max(1, parseInt(cursor, 10) || 1);
  return listing(ref, page);
}

export async function search(query) {
  const q = String((query && query.q) || "").trim();
  if (!q) return [];
  const html = await pageText(SITE + "/buscar?q=" + encodeURIComponent(q));
  return parseCards(html).slice(0, 60);
}

export async function episodes(ref) {
  if (!/^[\w-]{1,160}$/.test(String(ref || ""))) throw kino.error("not_found");
  const info = parseAnime(await pageText(SITE + "/anime/" + ref));
  if (!info) throw kino.error("not_found", "no such anime");
  const list = info.episodes.map((e) => ({ season: 1, number: Math.min(99999, Math.max(1, Math.floor(e.number))), ref: e.ref, title: e.title, ...(e.still ? { still: e.still } : {}) }));
  // The site lists the newest episode first.
  list.sort((a, b) => a.number - b.number);
  return {
    series: { title: info.title, overview: info.overview, poster: info.poster, backdrop: info.backdrop, genres: info.genres },
    episodes: list,
  };
}

// ---- servers ----

// The servers by how reliably they open, best first; one that is not here goes last.
const PREFER = ["streamwish", "vidhide", "mp4upload", "mixdrop", "uqload", "hexload", "okru", "voe", "byse", "streamtape", "dood", "savefiles"];

const understood = (link) => extractorFor(link) !== null;

function rankOf(name) {
  const i = PREFER.indexOf(name);
  return i < 0 ? PREFER.length : i;
}

/** The episode's servers, best first, as `[{ link, name, n }]`; `n` is the position a lazy copy's ref names. */
export function serversOf(html, preferred = "") {
  const list = parsePlayers(html).filter((p) => understood(p.link)).map((p, n) => ({ ...p, n, kind: extractorFor(p.link).name }));
  // The person's preferred server first, then the usual order.
  const rank = (k) => (k === preferred ? -1 : rankOf(k));
  return list.sort((a, b) => rank(a.kind) - rank(b.kind) || a.n - b.n).slice(0, MAX_COPIES);
}

const labelOf = (s) => (s.name + " · " + hostName(s.link)).slice(0, 48);
function hostName(link) { try { return new URL(link).hostname.replace(/^www\./, ""); } catch (_) { return "servidor"; } }

// ---- Kino Resolver install gate, and the resolver/hidden-browser that open each server ----

const RESOLVER_REPO = "xuper-plugin/kino-plugin-kino-resolver";
const SUPPORT_URL = "https://ko-fi.com/xuperplugins";
const HLS = "application/vnd.apple.mpegurl";
const CAPTURE_MS = 20000;

/** True when the shared kino-resolver is installed (a cheap door probe; only provider_missing means "not installed"). */
async function resolverInstalled() {
  try { await kino.plugins.call("resolver", "normalizeHost", { url: "https://probe.invalid/" }); return true; }
  catch (e) { return (e && e.code) !== "provider_missing"; }
}

/** The donate affordance under the install button: a QR on a TV (a link is hard to open there), a heart button elsewhere. */
function supportNode(device) {
  if (device === "tv") return { type: "QrImage", value: SUPPORT_URL, size: "large", labelText: "Si te gusta mi trabajo, escanéalo y apóyame", labelTextEn: "If you like my work, scan it and support me" };
  return { type: "ElevatedButton", key: "donate", icon: "heart", labelText: "Si te gusta mi trabajo, apóyame", labelTextEn: "If you like my work, support me", onPressed: { go: { url: { href: SUPPORT_URL } } } };
}

/** The install gate: the first screen while the shared kino-resolver (the engine LatAnime plays through) is not installed. */
function installGateView(device) {
  return { type: "Scaffold", key: "latanime-install",
    body: { type: "SingleChildScrollView", key: "installScroll", children: [
      { type: "Column", padding: 24, gap: 16, crossAxisAlignment: "stretch", children: [
        { type: "Text", text: "Necesitas el motor de reproducción", textEn: "You need the playback engine", style: "h3" },
        { type: "Text", color: "secondary", text: "LatAnime reproduce a través de Kino Resolver (gratis). Instálalo una vez y sirve para este y para otros plugins de sitios.", textEn: "LatAnime plays through Kino Resolver (free). Install it once and it works here and in other site plugins." },
        { type: "ElevatedButton", key: "installResolver", labelText: "Instalar Kino Resolver", labelTextEn: "Install Kino Resolver", onPressed: { go: { installPlugin: { repo: RESOLVER_REPO } } } },
        supportNode(device),
      ] },
    ] },
  };
}

/** A resolver stream as a Kino copy: `{ url, mime, headers }`, HLS unless the url ends in .mp4. */
function toStream(s) {
  const headers = { "User-Agent": UA };
  if (s.referer) headers.Referer = s.referer;
  if (Array.isArray(s.headers)) { for (const h of s.headers) if (h && h.name) headers[h.name] = String(h.value); }
  else if (s.headers && typeof s.headers === "object") Object.assign(headers, s.headers);
  return { url: s.url, mime: s.kind === "hls" ? HLS : (/\.mp4(\?|$)/i.test(s.url) ? "video/mp4" : HLS), headers };
}

/** The hidden browser opens the embed and Kino hands back the media it requested; null when nothing plays or the budget is spent. */
async function captureOpen(link, budget) {
  if (!kino.browser || typeof kino.browser.capture !== "function" || !budget || budget.captures <= 0) return null;
  budget.captures -= 1;
  try {
    const page = await kino.browser.capture(link, { timeoutMs: CAPTURE_MS, match: "\\.m3u8|\\.mp4", headers: { Referer: SITE + "/" } });
    const media = (page && page.media) || [];
    const best = media.find((x) => /m3u8/i.test(x.url)) || media[0];
    if (!best) return null;
    return { url: best.url, mime: best.mime || (/\.mp4/i.test(best.url) ? "video/mp4" : HLS), headers: best.headers || { Referer: link } };
  } catch (e) { kino.log("[latanime] capture", (e && e.code) || "failed"); return null; }
}

export async function resolve(ref) {
  if (!(await resolverInstalled())) throw kino.error("unavailable", "resolver missing", { userMessage: t(kino, "needResolver") });
  const [slug, pick] = String(ref || "").split("|");
  if (!/^[\w-]{1,160}$/.test(slug)) throw kino.error("not_found");
  let preferred = "";
  try { preferred = String(kino.config.get("server") || ""); } catch (_) { /* the usual order */ }
  const servers = serversOf(await pageText(SITE + "/ver/" + slug), preferred === "auto" ? "" : preferred);
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const deadline = Date.now() + CALL_MS;
  // Each server is opened through the shared kino-resolver; a host it cannot reach inline (e.g. savefiles behind Cloudflare) falls
  // to Kino's hidden browser, with a small shared budget so one slow capture does not hold the whole attempt back.
  const budget = { captures: 2 };
  const open = async (s) => {
    try {
      const res = await kino.plugins.call("resolver", "resolve", { url: s.link, referer: SITE + "/" });
      const st = (res && Array.isArray(res.streams) ? res.streams : []).find((x) => x && x.url);
      if (st) return toStream(st);
      if (res && res.error === "needs_browser") return captureOpen(s.link, budget);
    } catch (_) { /* provider_missing / failed: a known capture host may still open in the hidden browser */ }
    // savefiles sits behind Cloudflare, which the inline-only resolver cannot pass: the hidden browser opens it.
    if (s.kind === "savefiles") return captureOpen(s.link, budget);
    return null;
  };

  // A copy the person asked for: resolve just that one.
  if (pick !== undefined) {
    const s = servers.find((x) => String(x.n) === pick);
    const stream = s && (await open(s));
    if (!stream) throw kino.error("not_found", "that server did not open");
    return { ...stream, label: labelOf(s) };
  }

  // The servers are opened in batches, together inside a batch; the best one that works plays and every other server is a lazy copy.
  const opened = new Array(servers.length).fill(null);
  let at = -1;
  for (let from = 0; from < servers.length && at < 0 && Date.now() < deadline - 1500; from += TRY_AT_ONCE) {
    const got = await Promise.all(servers.slice(from, from + TRY_AT_ONCE).map(open));
    got.forEach((g, i) => { opened[from + i] = g; });
    at = opened.findIndex(Boolean);
  }
  if (at < 0) throw kino.error("not_found", "no server opened", { userMessage: t(kino, "noServer") });
  const first = servers[at];
  const alternatives = servers.filter((s) => s !== first).map((s) => {
    const i = servers.indexOf(s);
    return opened[i] ? { ...opened[i], label: labelOf(s) } : { label: labelOf(s), ref: slug + "|" + s.n };
  }).slice(0, MAX_COPIES - 1);
  const out = { ...opened[at], label: labelOf(first), alternatives };
  try { browseScreen().notePlayed(seriesOfEpisode(slug)); } catch (_) { /* never fails a play */ }
  return out;
}

// ---------- the browse screen ----------

/** A tab's page: its lists, fetched together; the first list's first titles get a synopsis and a picture for the slider. */
async function loadTab(tabId) {
  const tab = TABS.find((x) => x.id === tabId);
  if (!tab) return { rows: [] };
  const rows = await rowsOfLists(tab.lists);
  if (rows.length && tab.id === "inicio") {
    const head = rows[0].items.slice(0, SLIDE_DETAILS);
    const details = head.map(() => null);
    await settledWithin(5000, Promise.all(head.map(async (it, i) => {
      try { details[i] = parseAnime(await pageText(SITE + "/anime/" + it.ref)); } catch (_) { /* no synopsis for this one */ }
    })));
    head.forEach((it, i) => { if (details[i]) { it.overview = details[i].overview; if (details[i].backdrop) it.backdrop = details[i].backdrop; } });
  }
  return { rows };
}

/** A title as TMDB knows it: without the language the site adds, the season, the part, the year or the word "Película". */
export function metaTitle(title) {
  return String(title || "")
    .replace(/\s+(?:latino|castellano|subtitulado|japon[eé]s|sub espa[nñ]ol)\s*$/i, "")
    .replace(/\s+\((?:\d{4}|latino|castellano)\)\s*$/i, "")
    .replace(/\s+(?:S\d+|temporada\s*\d+|\d+(?:st|nd|rd|th)\s+season)\s*$/i, "")
    .replace(/\s*[:\-–]?\s*(?:la\s+)?pel[ií]culas?\s*$/i, "")
    .replace(/\s+(?:latino|castellano|subtitulado|japon[eé]s)\s*$/i, "")
    .replace(/[\s,:;\-–]+$/, "")
    .trim();
}

/** The TMDB search a card belongs to: the site files its films as "Película". */
export const metaType = (title) => (/pel[ií]culas?/i.test(String(title || "")) ? "movie" : "series");

let browseInstance = null;
const browseScreen = () => (browseInstance ??= makeBrowse({
  kino,
  brand: BRAND,
  tabs: TABS.map(({ id, es, en }) => ({ id, es, en })),
  loadTab,
  searchTitles: (q) => search({ q }),
  titleOf: (c) => metaTitle(c.title),
  typeOf: (c) => metaType(c.title),
}));

/** `screen(ctx)`: the plugin's own browse screen (a pure view: it draws what it holds and never waits for the site). */
export async function screen(ctx) {
  await null;
  const c = ctx && typeof ctx === "object" ? ctx : {};
  if (!(c.installed && c.installed[RESOLVER_REPO])) return installGateView(c.device);
  return browseScreen().view(c);
}

/** `screenEvent(ev)`: the screen's events (its timers load a tab or a search, one per call). */
export async function screenEvent(ev) {
  await null;
  return browseScreen().event(ev && typeof ev === "object" ? ev : {});
}
