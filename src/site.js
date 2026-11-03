// latanime.org read as plain HTML: the pages have no API, so every reader here is a pure function of the page text.

export const SITE = "https://latanime.org";
const HTTPS = /^https:\/\//;

const decode = (s) => String(s || "")
  .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/\s+/g, " ").trim();

const absolute = (href) => {
  const h = String(href || "").trim();
  if (h.startsWith("//")) return "https:" + h;
  if (h.startsWith("/")) return SITE + h;
  return h;
};

/** The language the site writes on a card or in a title ("Latino", "Castellano"), or "". */
export function langOf(text) {
  const t = String(text || "");
  if (/castellano/i.test(t)) return "esp";
  if (/latino/i.test(t)) return "lat";
  return "sub";
}

/** The anime cards of a listing or search page: `{ id, ref, title, kind: "series", poster, lang }`. */
export function parseCards(html) {
  const out = [];
  const seen = new Set();
  for (const block of String(html || "").split(/class="[^"]*\bcol-6 my-3[^"]*"/).slice(1)) {
    const href = /href="[^"]*\/anime\/([\w-]+)"/.exec(block);
    const title = /<h3[^>]*class="[^"]*my-1[^"]*"[^>]*>([^<]+)</.exec(block);
    if (!href || !title || seen.has(href[1])) continue;
    seen.add(href[1]);
    const img = /<img[^>]*?(?:data-src|src)="([^"]+)"/.exec(block);
    const poster = img ? absolute(img[1]) : "";
    out.push({
      id: href[1], ref: href[1], title: decode(title[1]).slice(0, 120), kind: "series",
      ...(HTTPS.test(poster) ? { poster } : {}), lang: langOf(title[1]),
    });
  }
  return out;
}

/** Whether the listing has a next page (Laravel's pager marks it with rel="next"). */
export const hasNext = (html) => /rel="next"/.test(String(html || ""));

/** `{ title, overview, poster, backdrop, genres, ongoing, episodes: [{ ref, number, title, still }] }` of an anime page. */
export function parseAnime(html) {
  const t = String(html || "");
  const title = /<h2[^>]*>([^<]+)</.exec(t);
  if (!title) return null;
  const poster = /class="serieimgficha"[\s\S]*?<img[^>]*?(?:data-src|src)="([^"]+)"/.exec(t);
  const og = /<meta property="og:image" content="([^"]+)"/.exec(t);
  const overview = /<p class="my-2 opacity-75">([\s\S]*?)<\/p>/.exec(t);
  const genres = [...t.matchAll(/href="[^"]*\/genero\/[\w-]+"[^>]*>\s*<div class="btn">([^<]+)</g)].map((m) => decode(m[1])).filter(Boolean);
  const episodes = [];
  const seen = new Set();
  for (const m of t.matchAll(/<a href="[^"]*\/ver\/([\w-]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    const label = decode(m[2].replace(/<img[^>]*>/g, "").replace(/<[^>]+>/g, " "));
    const num = /(?:cap[ií]tulo|episodio)\s*(\d+(?:\.\d+)?)/i.exec(label) || /episodio-(\d+)/.exec(m[1]);
    const still = /data-src="([^"]+)"/.exec(m[2]);
    episodes.push({
      ref: m[1], number: num ? Number(num[1]) : episodes.length + 1, title: label.slice(0, 120),
      ...(still && HTTPS.test(absolute(still[1])) ? { still: absolute(still[1]) } : {}),
    });
  }
  const p = poster ? absolute(poster[1]) : "";
  const b = og ? absolute(og[1]) : "";
  return {
    title: decode(title[1]).slice(0, 120),
    overview: overview ? decode(overview[1].replace(/Ver menos/g, "")).slice(0, 1000) : "",
    ...(HTTPS.test(p) ? { poster: p } : {}),
    ...(HTTPS.test(b) ? { backdrop: b } : {}),
    genres: genres.slice(0, 12),
    ongoing: /btn-estado estreno/.test(t),
    episodes,
  };
}

/** The players of an episode page: `[{ name, link }]` with the address decoded from its `data-player`. */
export function parsePlayers(html) {
  const out = [];
  for (const m of String(html || "").matchAll(/data-player="([^"]+)"[^>]*>([^<]*)</g)) {
    let link;
    try { link = atob(m[1]); } catch (_) { continue; }
    link = unwrap(link);
    if (HTTPS.test(link)) out.push({ name: decode(m[2]).slice(0, 30) || "servidor", link });
  }
  return out;
}

// Wrapper addresses the site puts around the real player, and mirrors of the same player under another name.
const WRAPPERS = ["https://monoschinos2.com/reproductor?url=", "https://mojon.latanime.org/aqua/fn?url="];
const MIRRORS = [["https://hglink.to", "https://streamwish.to"], ["https://swdyu.com", "https://streamwish.to"], ["https://mivalyo.com", "https://vidhidepro.com"], ["https://filemoon.link", "https://filemoon.sx"]];

export function unwrap(link) {
  let l = String(link || "").trim();
  for (const w of WRAPPERS) if (l.startsWith(w)) l = l.slice(w.length);
  for (const [from, to] of MIRRORS) if (l.startsWith(from)) l = to + l.slice(from.length);
  return l;
}

/** The series an episode belongs to: its page address without the trailing `-episodio-N`. */
export const seriesOfEpisode = (ref) => String(ref || "").replace(/-(?:episodio|capitulo)-\d+(?:-\d+)?$/, "");
