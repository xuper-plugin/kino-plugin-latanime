// LatAnime: anime of latanime.org in Spanish (Latino, Castellano or subtitled). The site is plain HTML, read by site.js. Kino
// gets the usual functions (home, browse, search, episodes, resolve) and its own browse screen with a slider, tabs and search.
// A server is an embed page of a third-party player: the extractors open it and find the stream.

import { extractorFor } from "./extractors/index.js";
import { makeRequester, requestPool, UA } from "./util/http.js";
import { SITE, parseCards, hasNext, parseAnime, parsePlayers, seriesOfEpisode } from "./site.js";
import { makeBrowse } from "./browse/index.js";
import { t } from "./i18n.js";

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

const rowOf = (ref, items) => ({ id: ref, title: LISTS[ref].es, titleEn: LISTS[ref].en, ref, items });

export async function home() {
  const refs = ["emision", "animes", "c:Película", "g:accion", "g:comedia"];
  const rows = await Promise.all(refs.map(async (ref) => {
    try { const p = await listing(ref, 1); return p.items.length ? rowOf(ref, p.items) : null; } catch (_) { return null; }
  }));
  const out = rows.filter(Boolean);
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

export async function resolve(ref) {
  const [slug, pick] = String(ref || "").split("|");
  if (!/^[\w-]{1,160}$/.test(slug)) throw kino.error("not_found");
  let preferred = "";
  try { preferred = String(kino.config.get("server") || ""); } catch (_) { /* the usual order */ }
  const servers = serversOf(await pageText(SITE + "/ver/" + slug), preferred === "auto" ? "" : preferred);
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const pool = requestPool(54);
  const deadline = Date.now() + CALL_MS;
  const open = (s) => extractorFor(s.link).extract(s.link, makeRequester(kino, { budget: 6, deadline, pools: [pool], maxMs: 8000 }), kino).catch(() => null);

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
  const rows = (await Promise.all(tab.lists.map(async (ref) => {
    try { const p = await listing(ref, 1); return p.items.length ? rowOf(ref, p.items) : null; } catch (_) { return null; }
  }))).filter(Boolean);
  if (rows.length && tab.id === "inicio") {
    const head = rows[0].items.slice(0, SLIDE_DETAILS);
    const details = await Promise.all(head.map(async (it) => {
      try { return parseAnime(await pageText(SITE + "/anime/" + it.ref)); } catch (_) { return null; }
    }));
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
  return browseScreen().view(ctx && typeof ctx === "object" ? ctx : {});
}

/** `screenEvent(ev)`: the screen's events (its timers load a tab or a search, one per call). */
export async function screenEvent(ev) {
  await null;
  return browseScreen().event(ev && typeof ev === "object" ? ev : {});
}
