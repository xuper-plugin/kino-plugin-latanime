// TodoAnime: anime of latanime.org in Spanish (Latino, Castellano or subtitled). The site is plain HTML, read by site.js. Kino
// gets the usual functions (home, browse, search, episodes, resolve) and its own browse screen with a slider, tabs and search.
// A server is an embed page of a third-party player: the shared Kino Resolver opens it (the hidden browser when it can't).

import { UA } from "./util/http.js";
import { SITE, parseCards, hasNext, parseAnime, parsePlayers, seriesOfEpisode } from "./site.js";
import { makeStandardScreen } from "./std/index.js";
import { scoresFromResolver } from "./std/rank.js";
import { LOGO, LOGO_ASPECT } from "./logo.js";
import { t } from "./i18n.js";

// Kino waits for every request a call left running before it delivers the call's answer; ask it to drop them once the call settles.
globalThis.__kinoDropPendingFetches = true;

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
const PREFER = ["streamwish", "vidhide", "mp4upload", "mixdrop", "uqload", "hexload", "okru", "lulu", "voe", "byse", "streamtape", "dood", "savefiles"];
// These need Kino's hidden browser (voe's human check, savefiles behind Cloudflare), as does a host nobody knows: they go
// after the ones the resolver reads with plain requests, whatever their score.
const NEEDS_BROWSER = new Set(["voe", "savefiles"]);

// A server's family, by its host: the names the "server" setting and the ranking use. A host not listed keeps its own name.
const FAMILIES = [
  ["streamwish", /streamwish|hglink|hlswish|vibuxer|swdyu|embedwish|playerwish|iplayerhls|wishembed/i],
  ["vidhide", /vidhide|mivalyo|morencius|callistanise|filelions|smoothpre|minochinos|dintezuvio/i],
  ["mp4upload", /mp4upload/i], ["mixdrop", /mixdrop|mxdrop/i], ["uqload", /uqload/i], ["hexload", /hexload/i],
  ["okru", /(^|\.)ok\.ru$|okru/i], ["lulu", /luluvdo|lulustream|luluvid/i], ["voe", /(^|\.)voe\.sx$|voe/i],
  ["byse", /filemoon|bysekoze|bysewihe|byse/i], ["streamtape", /streamtape/i],
  ["dood", /dood|dsvplay|d0+d|ds2play|playmogo/i], ["savefiles", /savefiles/i], ["goodstream", /goodstream/i],
  ["vimeos", /vimeos/i], ["fastream", /fastream/i], ["nupload", /nupload/i],
];
export function kindOf(link) {
  const host = hostName(link);
  const hit = FAMILIES.find(([, rx]) => rx.test(host));
  return hit ? hit[0] : host;
}

function rankOf(name) {
  const i = PREFER.indexOf(name);
  return i < 0 ? PREFER.length : i;
}

// ---- what each server has done for this person (the ranking) ----
// Every server opened in a resolve counts a success or a failure (a stream that played its first bytes, or nothing),
// Laplace-smoothed ((ok+1)/(ok+fail+2), unknown = 0.5) and halved past STATS_CAP so a server that recovers climbs back.
// Kept in kino.storage, which follows the person to their other devices.
const STATS_KEY = "srvStats";
const STATS_CAP = 24;
export function serverScores() {
  let all = {};
  try { all = JSON.parse(kino.storage.get(STATS_KEY) || "{}") || {}; } catch (_) { all = {}; }
  return (name) => { const s = all[name] || { ok: 0, fail: 0 }; return (s.ok + 1) / (s.ok + s.fail + 2); };
}
function noteServer(name, ok) {
  try {
    const all = JSON.parse(kino.storage.get(STATS_KEY) || "{}") || {};
    const s = all[name] || { ok: 0, fail: 0 };
    s[ok ? "ok" : "fail"] += 1;
    if (s.ok + s.fail > STATS_CAP) { s.ok = Math.round(s.ok / 2); s.fail = Math.round(s.fail / 2); }
    all[name] = s;
    kino.storage.set(STATS_KEY, JSON.stringify(all));
  } catch (_) { /* the stats are a nicety */ }
}

/**
 * The episode's servers, best first, as `[{ link, name, n, kind }]`; `n` is the position a lazy copy's ref names. Every
 * https link the page lists is kept (the resolver reads far more hosts than this plugin ever did, and the hidden browser
 * takes the rest), in this order: the person's preferred server; then the ones read with plain requests before the ones that
 * need the hidden browser; inside each, the server that has loaded best for this person ([score]); then [PREFER]; then the page.
 * With [ranks] (kino-resolver's rank call: a score per link, from its playback audit) that score replaces the plain/browser
 * tier and [PREFER]: the person's preferred server, then what loaded best for this person, then the resolver's ranking.
 */
export function serversOf(html, preferred = "", score = null, ranks = null) {
  const list = parsePlayers(html).map((p, n) => ({ ...p, n, kind: kindOf(p.link), _r: ranks && typeof ranks.get(p.link) === "number" ? ranks.get(p.link) : null }));
  const pref = (k) => (preferred && k === preferred ? 0 : 1);
  const tier = (k) => (NEEDS_BROWSER.has(k) || !PREFER.includes(k) ? 1 : 0);
  const learned = (k) => (score ? -score(k) : 0);
  if (ranks) return list.sort((a, b) => pref(a.kind) - pref(b.kind) || learned(a.kind) - learned(b.kind) || (b._r ?? 0) - (a._r ?? 0) || a.n - b.n).slice(0, MAX_COPIES);
  return list.sort((a, b) => pref(a.kind) - pref(b.kind) || tier(a.kind) - tier(b.kind) || learned(a.kind) - learned(b.kind) || rankOf(a.kind) - rankOf(b.kind) || a.n - b.n).slice(0, MAX_COPIES);
}

const labelOf = (s) => (s.name + " · " + hostName(s.link)).slice(0, 48);
function hostName(link) { try { return new URL(link).hostname.replace(/^www\./, ""); } catch (_) { return "servidor"; } }

// ---- the resolver and the hidden browser that open each server ----

const HLS = "application/vnd.apple.mpegurl";
const CAPTURE_MS = 20000;

/** True when the shared kino-resolver is installed (a cheap door probe; only provider_missing means "not installed"). */
async function resolverInstalled() {
  try { await kino.plugins.call("resolver", "normalizeHost", { url: "https://probe.invalid/" }); return true; }
  catch (e) { return (e && e.code) !== "provider_missing"; }
}

/** A resolver stream as a Kino copy: `{ url, mime, headers }`, HLS unless the url ends in .mp4. */
function toStream(s) {
  const headers = { "User-Agent": UA };
  if (s.referer) headers.Referer = s.referer;
  if (Array.isArray(s.headers)) { for (const h of s.headers) if (h && h.name) headers[h.name] = String(h.value); }
  else if (s.headers && typeof s.headers === "object") Object.assign(headers, s.headers);
  return { url: s.url, mime: s.kind === "hls" ? HLS : (/\.mp4(\?|$)/i.test(s.url) ? "video/mp4" : HLS), headers };
}

/** Whether a resolved stream answers: a 2 KB peek (maxBytes + Range, so a whole-file mp4 is not downloaded); an HLS playlist
 *  must start like one; a 401/403 (a token tied to the player) is trusted. A dead CDN node (an mp4upload file timing out,
 *  measured 2026-11-22) would otherwise reach the player as the first copy. Never throws. */
async function answers(stream) {
  try {
    const r = await kino.fetch(stream.url, { headers: { ...stream.headers, Range: "bytes=0-2047" }, timeoutMs: 5000, maxBytes: 2048 });
    if (r.status === 401 || r.status === 403) return true;
    if (!r.ok) return false;
    // Only a real playlist address must read like one (streamtape's get_video?… is an mp4 behind a token).
    return !/\.m3u8(\?|$)/i.test(stream.url) || /^\s*#EXTM3U/.test(r.text() || "");
  } catch (e) {
    // A timeout is a slow CDN, not a dead one (a Redmi took 4.3 s for one TLS handshake, then played): the player gets it.
    return !!(e && (e.code === "host_not_allowed" || e.code === "too_large" || e.code === "timeout"));
  }
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
  } catch (e) { kino.log("[todoanime] capture", (e && e.code) || "failed"); return null; }
}

export async function resolve(ref) {
  if (!(await resolverInstalled())) throw kino.error("unavailable", "resolver missing", { userMessage: t(kino, "needResolver") });
  const [slug, pick] = String(ref || "").split("|");
  if (!/^[\w-]{1,160}$/.test(slug)) throw kino.error("not_found");
  let preferred = "";
  try { preferred = String(kino.config.get("server") || ""); } catch (_) { /* the usual order */ }
  const html = await pageText(SITE + "/ver/" + slug);
  const links = parsePlayers(html).map((p) => p.link);
  const scores = await scoresFromResolver(kino, links);
  const ranks = scores ? new Map(links.map((l, i) => [l, scores[i]])) : null;
  const servers = serversOf(html, preferred === "auto" ? "" : preferred, serverScores(), ranks);
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const deadline = Date.now() + CALL_MS;
  // Each server is opened through the shared kino-resolver; a host it cannot reach inline (a gated or unknown one, e.g.
  // savefiles behind Cloudflare) falls to Kino's hidden browser, with a small shared budget so one slow capture does not hold
  // the whole attempt back. A stream the resolver found is peeked at first: its CDN can be down for that one file.
  const budget = { captures: 2 };
  const openOne = async (s) => {
    try {
      const res = await kino.plugins.call("resolver", "resolve", { url: s.link, referer: SITE + "/" });
      const st = (res && Array.isArray(res.streams) ? res.streams : []).find((x) => x && x.url);
      if (st) { const out = toStream(st); return (await answers(out)) ? out : null; }
      if (res && res.error === "dead") return null;
    } catch (_) { /* provider_missing / failed: the hidden browser may still reach it */ }
    return captureOpen(s.link, budget);
  };
  const open = async (s) => {
    const out = await openOne(s);
    noteServer(s.kind, !!out);
    return out;
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
  try { standard().notePlayed(seriesOfEpisode(slug)); } catch (_) { /* never fails a play */ }
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

// ---- the screen: the standard xuper-plugin screen (src/std) ----

// TodoAnime opens every server through kino-resolver (the hidden-browser capture is only a fallback), so it does not play without it: the screen is the install gate while it is missing, and resolve() refuses.
let std = null;
const standard = () => (std ??= makeStandardScreen({ snapshot: "xuper-plugin/kino-plugin-latanime",
  kino, name: "TodoAnime", logo: LOGO, logoAspect: LOGO_ASPECT, needsResolver: true, hasSettings: true,
  tabs: [
    { id: "inicio", label: "Inicio", labelEn: "Home" },
    { id: "emision", label: "En emisión", labelEn: "Airing" },
    { id: "peliculas", label: "Películas", labelEn: "Movies" },
    { id: "generos", label: "Géneros", labelEn: "Genres" },
  ],
  loadTab: loadTab,
  titleOf: (c) => metaTitle(c.title), typeOf: (c) => metaType(c.title),
  // The site's thumbnails sit behind Cloudflare: TMDB's pictures where a title matches, and the site's own asked with its Referer.
  tmdbPictures: true, imageHeaders: { Referer: SITE + "/", "User-Agent": UA },
}));

export async function screen(ctx) {
  await null;
  return standard().screen(ctx && typeof ctx === "object" ? ctx : {});
}

export async function screenEvent(ev) {
  await null;
  return standard().screenEvent(ev && typeof ev === "object" ? ev : {});
}

// std 1.7.0: the catalog door -- the author's other plugins (Da-Video) find titles here through Kino, and Kino opens and
// plays what they find in this plugin, with its own resolve.
import { catalogDoor } from "./std/catalog.js";
export const proto_catalog_search = catalogDoor(search);
