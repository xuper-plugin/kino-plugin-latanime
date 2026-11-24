// kino-plugin.json
var kino_plugin_default = {
  id: "todoanime",
  name: "TodoAnime",
  version: "0.5.10",
  apiVersion: 30,
  entry: "plugin.js",
  icon: "icon.png",
  description: "Anime en espa\xF1ol latino, castellano o subtitulado de latanime.org, con slider, g\xE9neros y buscador.",
  author: "xuper-plugin",
  homepage: "https://github.com/xuper-plugin/kino-plugin-latanime",
  hosts: [
    "latanime.org",
    "*.latanime.org",
    "filemoon.sx",
    "*.filemoon.sx",
    "filemoon.link",
    "*.filemoon.link",
    "byse.sx",
    "*.byse.sx",
    "bysezoxexe.com",
    "*.bysezoxexe.com",
    "bysezejataos.com",
    "*.bysezejataos.com",
    "bysebuho.com",
    "*.bysebuho.com",
    "bysevepoin.com",
    "*.bysevepoin.com",
    "byseqekaho.com",
    "*.byseqekaho.com",
    "dood.la",
    "*.dood.la",
    "dood.yt",
    "*.dood.yt",
    "dood.to",
    "*.dood.to",
    "dood.so",
    "*.dood.so",
    "dood.ws",
    "*.dood.ws",
    "dood.pm",
    "*.dood.pm",
    "dood.wf",
    "*.dood.wf",
    "dood.re",
    "*.dood.re",
    "dood.cx",
    "*.dood.cx",
    "dood.sh",
    "*.dood.sh",
    "dood.li",
    "*.dood.li",
    "dood.watch",
    "*.dood.watch",
    "doodstream.com",
    "*.doodstream.com",
    "dooood.com",
    "*.dooood.com",
    "doods.pro",
    "*.doods.pro",
    "d0000d.com",
    "*.d0000d.com",
    "d000d.com",
    "*.d000d.com",
    "ds2play.com",
    "*.ds2play.com",
    "ds2video.com",
    "*.ds2video.com",
    "dsvplay.com",
    "*.dsvplay.com",
    "vide0.net",
    "*.vide0.net",
    "myvidplay.com",
    "*.myvidplay.com",
    "playmogo.com",
    "*.playmogo.com",
    "fastream.to",
    "*.fastream.to",
    "goodstream.one",
    "*.goodstream.one",
    "hexload.com",
    "*.hexload.com",
    "mixdrop.top",
    "*.mixdrop.top",
    "mixdrop.co",
    "*.mixdrop.co",
    "mixdrop.to",
    "*.mixdrop.to",
    "mixdrop.ch",
    "*.mixdrop.ch",
    "mixdrop.ag",
    "*.mixdrop.ag",
    "mixdrop.bz",
    "*.mixdrop.bz",
    "mixdrop.sx",
    "*.mixdrop.sx",
    "mixdrop.gl",
    "*.mixdrop.gl",
    "mxdrop.click",
    "*.mxdrop.click",
    "mxcontent.net",
    "*.mxcontent.net",
    "m1xdrop.com",
    "*.m1xdrop.com",
    "mp4upload.com",
    "*.mp4upload.com",
    "nupload.me",
    "*.nupload.me",
    "nupload.my",
    "*.nupload.my",
    "ok.ru",
    "*.ok.ru",
    "savefiles.com",
    "*.savefiles.com",
    "streamhls.to",
    "*.streamhls.to",
    "streamtape.com",
    "*.streamtape.com",
    "streamtape.net",
    "*.streamtape.net",
    "streamtape.xyz",
    "*.streamtape.xyz",
    "streamtape.to",
    "*.streamtape.to",
    "shavetape.cash",
    "*.shavetape.cash",
    "watchadsontape.com",
    "*.watchadsontape.com",
    "tapewithadblock.org",
    "*.tapewithadblock.org",
    "strtape.cloud",
    "*.strtape.cloud",
    "strcloud.link",
    "*.strcloud.link",
    "stape.fun",
    "*.stape.fun",
    "hlswish.com",
    "*.hlswish.com",
    "streamwish.com",
    "*.streamwish.com",
    "streamwish.to",
    "*.streamwish.to",
    "strwish.com",
    "*.strwish.com",
    "wishembed.com",
    "*.wishembed.com",
    "filelions.com",
    "*.filelions.com",
    "hglink.to",
    "*.hglink.to",
    "vibuxer.com",
    "*.vibuxer.com",
    "uqload.com",
    "*.uqload.com",
    "uqload.co",
    "*.uqload.co",
    "uqload.cx",
    "*.uqload.cx",
    "uqload.bz",
    "*.uqload.bz",
    "uqload.vc",
    "*.uqload.vc",
    "uqload.is",
    "*.uqload.is",
    "uqload.io",
    "*.uqload.io",
    "uqload.net",
    "*.uqload.net",
    "vidhide.com",
    "*.vidhide.com",
    "vidhidepro.com",
    "*.vidhidepro.com",
    "vidhideplus.com",
    "*.vidhideplus.com",
    "vidhidefast.com",
    "*.vidhidefast.com",
    "dintezuvio.com",
    "*.dintezuvio.com",
    "minochinos.com",
    "*.minochinos.com",
    "filelions.to",
    "*.filelions.to",
    "morencius.com",
    "*.morencius.com",
    "vimeos.net",
    "*.vimeos.net",
    "vimeos.zip",
    "*.vimeos.zip",
    "voe.sx",
    "*.voe.sx",
    "wishembed.pro",
    "*.wishembed.pro",
    "sfastwish.com",
    "*.sfastwish.com"
  ],
  fetchHosts: "any",
  capabilities: [
    "search",
    "home",
    "browse",
    "episodes",
    "resolve",
    "screen"
  ],
  streamHosts: "any",
  categories: [
    "anime"
  ],
  color: "#7C4DFF",
  browser: true,
  theme: {
    accent: "#7C4DFF",
    onAccent: "#FFFFFF",
    background: "#0D0A14",
    surface: "#1A1524",
    highlight: "#D9CCFF"
  },
  settings: [
    {
      key: "server",
      type: "select",
      label: "Servidor preferido",
      labelEn: "Preferred server",
      default: "auto",
      options: [
        {
          value: "auto",
          label: "Autom\xE1tico",
          labelEn: "Automatic"
        },
        {
          value: "mp4upload",
          label: "Mp4Upload",
          labelEn: "Mp4Upload"
        },
        {
          value: "mixdrop",
          label: "MixDrop",
          labelEn: "MixDrop"
        },
        {
          value: "hexload",
          label: "Hexload",
          labelEn: "Hexload"
        },
        {
          value: "streamwish",
          label: "StreamWish",
          labelEn: "StreamWish"
        },
        {
          value: "vidhide",
          label: "VidHide",
          labelEn: "VidHide"
        },
        {
          value: "uqload",
          label: "Uqload",
          labelEn: "Uqload"
        },
        {
          value: "okru",
          label: "ok.ru",
          labelEn: "ok.ru"
        },
        {
          value: "voe",
          label: "VOE",
          labelEn: "VOE"
        }
      ],
      hint: "Se prueba primero al reproducir; si no abre, se siguen los dem\xE1s.",
      hintEn: "It is tried first when you play; if it does not open, the others follow."
    }
  ],
  consumes: {
    resolver: {
      repo: "xuper-plugin/kino-plugin-kino-resolver",
      door: "resolver",
      calls: [
        "resolve",
        "rank"
      ]
    }
  },
  recommends: [
    "xuper-plugin/kino-plugin-kino-resolver"
  ],
  screen: {
    label: "TodoAnime",
    labelEn: "TodoAnime",
    icon: "movie",
    menuOpens: "screen",
    opensFrom: [
      "menu",
      "settings"
    ],
    settingsButton: {
      label: "Abrir TodoAnime",
      labelEn: "Open TodoAnime"
    },
    settingsIn: "both"
  },
  provides: {
    catalog: {
      summary: "Titles this plugin finds, for the author's other plugins",
      calls: {
        search: {
          in: {
            q: "string",
            type: "string?"
          },
          out: "Item[]"
        }
      },
      types: {
        Item: {
          id: "string",
          ref: "string",
          title: "string",
          kind: "string",
          poster: "string?",
          backdrop: "string?",
          year: "string?",
          overview: "string?",
          tmdb: "number?"
        }
      }
    }
  },
  signature: {
    authorKey: "6693946bd5c56196960959c4b9665fad5094374bcb85ddb282f8bf762c835263",
    value: "2c97212a05eecc6f181467f0c337156aa2937013d19931d7fe72b880c5eb8f2825de59ee945db98102b23fc6baad6da1f4156bf45bad6e8241fcccaaaaa96506"
  }
};

// src/util/hosts.js
function hostMatcher(entries) {
  const exact = /* @__PURE__ */ new Set();
  const suffixes = [];
  for (const raw of entries || []) {
    const h = String(typeof raw === "string" ? raw : raw && raw.host || "").toLowerCase();
    if (!h) continue;
    if (h.startsWith("*.")) suffixes.push(h.slice(1));
    else exact.add(h);
  }
  return (host) => {
    const h = String(host || "").toLowerCase();
    return exact.has(h) || suffixes.some((s) => h.length > s.length && h.endsWith(s));
  };
}
var hostDeclared = hostMatcher(kino_plugin_default.hosts);

// src/util/http.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// src/site.js
var SITE = "https://latanime.org";
var HTTPS = /^https:\/\//;
var decode = (s) => String(s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/\s+/g, " ").trim();
var absolute = (href) => {
  const h = String(href || "").trim();
  if (h.startsWith("//")) return "https:" + h;
  if (h.startsWith("/")) return SITE + h;
  return h;
};
function langOf(text) {
  const t2 = String(text || "");
  if (/castellano/i.test(t2)) return "esp";
  if (/latino/i.test(t2)) return "lat";
  return "sub";
}
function parseCards(html) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const block of String(html || "").split(/class="[^"]*\bcol-6 my-3[^"]*"/).slice(1)) {
    const href = /href="[^"]*\/anime\/([\w-]+)"/.exec(block);
    const title = /<h3[^>]*class="[^"]*my-1[^"]*"[^>]*>([^<]+)</.exec(block);
    if (!href || !title || seen.has(href[1])) continue;
    seen.add(href[1]);
    const img = /<img[^>]*?(?:data-src|src)="([^"]+)"/.exec(block);
    const poster = img ? absolute(img[1]) : "";
    out.push({
      id: href[1],
      ref: href[1],
      title: decode(title[1]).slice(0, 120),
      kind: "series",
      ...HTTPS.test(poster) ? { poster } : {},
      lang: langOf(title[1])
    });
  }
  return out;
}
var hasNext = (html) => /rel="next"/.test(String(html || ""));
function parseAnime(html) {
  const t2 = String(html || "");
  const title = /<h2[^>]*>([^<]+)</.exec(t2);
  if (!title) return null;
  const poster = /class="serieimgficha"[\s\S]*?<img[^>]*?(?:data-src|src)="([^"]+)"/.exec(t2);
  const og = /<meta property="og:image" content="([^"]+)"/.exec(t2);
  const overview = /<p class="my-2 opacity-75">([\s\S]*?)<\/p>/.exec(t2);
  const genres = [...t2.matchAll(/href="[^"]*\/genero\/[\w-]+"[^>]*>\s*<div class="btn">([^<]+)</g)].map((m) => decode(m[1])).filter(Boolean);
  const episodes2 = [];
  const seen = /* @__PURE__ */ new Set();
  for (const m of t2.matchAll(/<a href="[^"]*\/ver\/([\w-]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    const label = decode(m[2].replace(/<img[^>]*>/g, "").replace(/<[^>]+>/g, " "));
    const num = /(?:cap[ií]tulo|episodio)\s*(\d+(?:\.\d+)?)/i.exec(label) || /episodio-(\d+)/.exec(m[1]);
    const still = /data-src="([^"]+)"/.exec(m[2]);
    episodes2.push({
      ref: m[1],
      number: num ? Number(num[1]) : episodes2.length + 1,
      title: label.slice(0, 120),
      ...still && HTTPS.test(absolute(still[1])) ? { still: absolute(still[1]) } : {}
    });
  }
  const p = poster ? absolute(poster[1]) : "";
  const b = og ? absolute(og[1]) : "";
  return {
    title: decode(title[1]).slice(0, 120),
    overview: overview ? decode(overview[1].replace(/Ver menos/g, "")).slice(0, 1e3) : "",
    ...HTTPS.test(p) ? { poster: p } : {},
    ...HTTPS.test(b) ? { backdrop: b } : {},
    genres: genres.slice(0, 12),
    ongoing: /btn-estado estreno/.test(t2),
    episodes: episodes2
  };
}
function parsePlayers(html) {
  const out = [];
  for (const m of String(html || "").matchAll(/data-player="([^"]+)"[^>]*>([^<]*)</g)) {
    let link;
    try {
      link = atob(m[1]);
    } catch (_) {
      continue;
    }
    link = unwrap(link);
    if (HTTPS.test(link)) out.push({ name: decode(m[2]).slice(0, 30) || "servidor", link });
  }
  return out;
}
var WRAPPERS = ["https://monoschinos2.com/reproductor?url=", "https://mojon.latanime.org/aqua/fn?url="];
var MIRRORS = [["https://hglink.to", "https://streamwish.to"], ["https://swdyu.com", "https://streamwish.to"], ["https://mivalyo.com", "https://vidhidepro.com"], ["https://filemoon.link", "https://filemoon.sx"]];
function unwrap(link) {
  let l = String(link || "").trim();
  for (const w of WRAPPERS) if (l.startsWith(w)) l = l.slice(w.length);
  for (const [from, to] of MIRRORS) if (l.startsWith(from)) l = to + l.slice(from.length);
  return l;
}
var seriesOfEpisode = (ref) => String(ref || "").replace(/-(?:episodio|capitulo)-\d+(?:-\d+)?$/, "");

// src/std/model.js
var MAX_SLIDES = 5;
var MAX_RAILS = 8;
var MAX_RAIL_ITEMS = 20;
var MAX_SLIDE_TEXT = 160;
var HTTPS2 = /^https:\/\//;
function cardOf(item) {
  const out = { id: item.id, ref: item.ref, title: item.title, kind: item.kind };
  if (item.poster && HTTPS2.test(item.poster)) out.poster = item.poster;
  if (item.backdrop && HTTPS2.test(item.backdrop)) out.backdrop = item.backdrop;
  if (item.badges) out.badges = item.badges;
  if (item.rating !== void 0) out.rating = item.rating;
  if (item.year !== void 0) out.year = item.year;
  if (item.ids && item.ids.tmdb) out.ids = { tmdb: item.ids.tmdb };
  if (item.lang) out.lang = item.lang;
  if (item.adult === true) out.adult = true;
  return out;
}
var slidesOf = (rows) => pickSlides(rows, (item) => item.backdrop);
var posterSlidesOf = (rows) => pickSlides(rows, (item) => item.poster);
function slideText(overview, item = {}) {
  const text = typeof overview === "string" ? overview.trim() : "";
  if (text === "") return [item.year, item.rating ? "\u2605 " + item.rating : null].filter(Boolean).join(" \xB7 ");
  return text.length <= MAX_SLIDE_TEXT ? text : `${text.slice(0, MAX_SLIDE_TEXT - 1).trimEnd()}\u2026`;
}
function pickSlides(rows, pictureOf) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const row of rows) {
    for (const item of row.items || []) {
      if (out.length >= MAX_SLIDES) return out;
      const image = pictureOf(item);
      if (item.adult === true || seen.has(item.id) || !image || !HTTPS2.test(image)) continue;
      seen.add(item.id);
      out.push({ id: item.id, ref: item.ref, kind: item.kind, title: item.title, image, text: slideText(item.overview, item) });
    }
  }
  return out;
}
var uniform = (items) => items.every((i) => i.backdrop) ? items : items.map(({ backdrop, ...rest }) => rest);
function railsOf(rows) {
  return rows.filter((r) => !r.hidden && r.items && r.items.length > 0).slice(0, MAX_RAILS).map((r) => ({
    id: r.id,
    title: r.title,
    ...r.titleEn ? { titleEn: r.titleEn } : {},
    ...r.ref ? { ref: r.ref } : {},
    items: uniform(r.items.slice(0, MAX_RAIL_ITEMS).map(cardOf))
  }));
}
function tabOf(page) {
  const rows = page && Array.isArray(page.rows) ? page.rows : [];
  const rails = railsOf(rows);
  if (rails.length === 0) return null;
  return { slides: slidesOf(rows), posterSlides: posterSlidesOf(rows), rails };
}
function playedKey(ref) {
  const m = /^(?:m|s|e):(\d{1,10})(?::|$)/.exec(String(ref || ""));
  return m ? `t:${m[1]}` : String(ref || "");
}
function recentOf(keys, tabs) {
  if (keys.length === 0) return [];
  const byKey = /* @__PURE__ */ new Map();
  for (const data of tabs) {
    for (const rail2 of data.rails) {
      for (const card of rail2.items) {
        const ks = [card.ref];
        if (card.ids && card.ids.tmdb) ks.push(`t:${card.ids.tmdb}`);
        for (const k of ks) if (!byKey.has(k)) byKey.set(k, card);
      }
    }
  }
  const out = [];
  const used = /* @__PURE__ */ new Set();
  for (const key of keys) {
    const card = byKey.get(key);
    if (card && !used.has(card.id)) {
      used.add(card.id);
      out.push(card);
    }
  }
  return out;
}

// src/std/strings.js
var WORDS = {
  watch: ["Ver", "Watch"],
  info: ["M\xE1s informaci\xF3n", "More info"],
  recent: ["Continuar viendo", "Continue watching"],
  search: ["Buscar", "Search"],
  searchHint: ["Buscar en {name}", "Search {name}"],
  failed: ["No se pudo cargar esta secci\xF3n. Revisa tu conexi\xF3n e int\xE9ntalo de nuevo.", "This section could not be loaded. Check your connection and try again."],
  retry: ["Reintentar", "Retry"],
  empty: ["A\xFAn no hay nada aqu\xED.", "Nothing here yet."],
  back: ["Atr\xE1s", "Back"],
  close: ["Cerrar", "Close"],
  settings: ["Ajustes", "Settings"],
  resultsTitle: ["Resultados: {q}", "Results: {q}"],
  resultsIn: ["En {name}", "In {name}"],
  resultsSearching: ["Buscando en {name}\u2026", "Searching {name}\u2026"],
  resultsFailed: ["{name} no respondi\xF3 esta vez.", "{name} did not answer this time."],
  noResults: ["No encontramos nada con esas palabras en tus plugins.", "Nothing in your plugins matched those words."],
  supportTv: ["Si te gusta mi trabajo, escan\xE9alo y ap\xF3yame", "If you like my work, scan it and support me"],
  support: ["Si te gusta mi trabajo, ap\xF3yame", "If you like my work, support me"],
  gateTitle: ["Necesitas el motor de reproducci\xF3n", "You need the playback engine"],
  gateText: [
    "{name} reproduce a trav\xE9s de Kino Resolver (gratis). Inst\xE1lalo una vez y sirve para este y para otros plugins de sitios.",
    "{name} plays through Kino Resolver (free). Install it once and it works here and in other site plugins."
  ],
  gateInstall: ["Instalar Kino Resolver", "Install Kino Resolver"]
};
var fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => vars && vars[k] != null ? String(vars[k]) : m);
function twin(key, field = "text", vars) {
  const [es, en] = WORDS[key];
  const pick = (i) => vars && Object.fromEntries(Object.entries(vars).map(([k, v]) => [k, Array.isArray(v) ? v[i] : v]));
  return { [field]: fill(es, pick(0)), [field + "En"]: fill(en, pick(1)) };
}
var STRING_KEYS = Object.keys(WORDS);

// src/std/view.js
var SUPPORT_URL = "https://ko-fi.com/xuperplugins";
var RESOLVER_REPO = "xuper-plugin/kino-plugin-kino-resolver";
var POLL_MS = 1500;
function brand(cfg) {
  return {
    type: "Row",
    key: "brand",
    gap: 12,
    crossAxisAlignment: "center",
    children: [
      ...cfg.logo ? [{ type: "Image", key: "logo", url: cfg.logo, aspect: cfg.logoAspect || "1:1", fit: "contain", h: 32, alt: cfg.name, altEn: cfg.nameEn || cfg.name }] : [],
      { type: "Text", key: "name", style: "h4", text: cfg.name, textEn: cfg.nameEn || cfg.name }
    ]
  };
}
var tabBar = (tabs, active) => ({
  type: "TabBar",
  key: "tabs",
  divider: false,
  value: active,
  onChanged: "tab",
  tabs: tabs.map((t2) => ({ value: t2.id, label: t2.label, labelEn: t2.labelEn || t2.label }))
});
var iconButton = (key, icon, word, onPressed) => ({ type: "IconButton", key, icon, ...twin(word, "labelText"), ...twin(word, "tooltip"), onPressed });
var searchOpenOps = (tabsInBar) => [
  { hide: "close" },
  { hide: "brand" },
  { hide: "searchButton" },
  { hide: "settingsButton" },
  ...tabsInBar ? [{ hide: "tabs" }] : [],
  { show: "closeSearch" },
  { show: "q" },
  { focus: "q" }
];
var searchClosedOps = (tabsInBar) => [
  { hide: "closeSearch" },
  { hide: "q" },
  { clear: "q" },
  { show: "close" },
  { show: "brand" },
  { show: "searchButton" },
  { show: "settingsButton" },
  ...tabsInBar ? [{ show: "tabs" }] : []
];
var leaveButton = (cfg) => cfg.backArrow ? iconButton("close", "arrow_back", "back", { go: { close: true } }) : iconButton("close", "close", "close", { go: { close: true } });
function supportNode(device) {
  if (device === "tv") return { type: "QrImage", key: "donate", value: SUPPORT_URL, size: "large", ...twin("supportTv", "labelText") };
  return { type: "ElevatedButton", key: "donate", icon: "heart", ...twin("support", "labelText"), onPressed: { go: { url: { href: SUPPORT_URL } } } };
}
var bar = ({ leading, title, actions = [] }) => ({ type: "AppBar", mergeWithKinoBar: true, dense: true, divider: false, leading, title, actions });
var railSkeleton = (n) => ({
  type: "Column",
  key: "skel" + n,
  gap: 8,
  children: [
    { type: "Skeleton", shape: "line", width: 120 },
    { type: "Row", gap: 12, sizes: ["compact"], children: [1, 2, 3].map((i) => ({ type: "Skeleton", shape: "card", key: `sk${n}c${i}`, flex: 1 })) },
    { type: "Row", gap: 12, sizes: ["medium", "expanded"], children: [1, 2, 3, 4, 5, 6].map((i) => ({ type: "Skeleton", shape: "card", key: `sk${n}w${i}`, flex: 1 })) }
  ]
});
var heroSkeleton = () => ({ type: "Skeleton", key: "heroSkeleton", shape: "block", height: { compact: 200, expanded: 320 } });
var titleOf = (s) => ({ ref: s.ref, kind: s.kind, id: s.id, title: s.title });
var withHeaders = (headers) => headers ? { headers } : {};
var slideNode = (s, headers) => ({
  type: "heroCard",
  key: "slide-" + s.id,
  h: { compact: 200, expanded: 240 },
  ...s.logo ? { logo: s.logo } : {},
  title: s.title,
  text: s.text,
  image: s.image,
  ...withHeaders(headers),
  buttons: [
    { type: "ElevatedButton", key: "watch-" + s.id, ...twin("watch", "labelText"), icon: "play", onPressed: { go: { play: titleOf(s) } } },
    { type: "TextButton", key: "info-" + s.id, ...twin("info", "labelText"), onPressed: { go: { title: titleOf(s) } } }
  ]
});
var hero = (slides, headers) => slides.length === 1 ? slideNode(slides[0], headers) : {
  type: "PageView",
  key: "hero" + slides.length,
  autoPlayMs: 6e3,
  children: slides.map((s) => slideNode(s, headers))
};
var rail = (r, key, words, headers) => ({
  type: "titleRail",
  key,
  ...words || { title: r.title, titleEn: r.titleEn || r.title },
  ...r.ref ? { ref: r.ref } : {},
  items: r.items,
  ...withHeaders(headers)
});
function browseView(cfg, { tab, data, recent, pending, failed, searching = false, device = "phone", own = null, ownActions = [] }) {
  const tv = device === "tv";
  const tabs = own ? [cfg.tabs[0]] : cfg.tabs;
  const active = tabs.some((t2) => t2.id === tab) ? tab : tabs[0].id;
  const withTabs = tabs.length > 1;
  const body = [];
  const ownBlocks = own && !Array.isArray(own) && Array.isArray(own.blocks) ? own.blocks : null;
  if (ownBlocks) {
  } else if (own) {
    body.push(...own);
  } else if (data) {
    const h = cfg.imageHeaders;
    if (data.slides.length > 0) body.push(hero(data.slides, h));
    if (recent.length > 0) body.push(rail({ items: recent }, "recent", twin("recent", "title"), h));
    for (const r of data.rails) body.push(rail(r, "rail-" + String(r.id).replace(/[^A-Za-z0-9_-]/g, "_"), null, h));
    if (data.rails.length === 0) body.push({ type: "Text", key: "empty", ...twin("empty"), color: "muted" });
  } else if (failed) {
    body.push({ type: "MaterialBanner", key: "loadFailed", role: "error", ...twin("failed"), action: { ...twin("retry", "label"), onTap: "retry" } });
  } else {
    body.push(heroSkeleton(), railSkeleton(1), railSkeleton(2), railSkeleton(3));
  }
  const isBanner = (n) => !!n && (n.type === "heroCard" || n.key === "heroSkeleton" || n.type === "PageView" && String(n.key).startsWith("hero"));
  const banner = body.length > 0 && isBanner(body[0]) ? body.shift() : null;
  const tabsInBar = tv && withTabs;
  const appBar = bar({
    leading: leaveButton(cfg),
    title: { type: "Row", key: "titleRow", gap: tabsInBar ? 24 : 8, crossAxisAlignment: "center", children: [
      { ...iconButton("closeSearch", "arrow_back", "back", { ui: searchClosedOps(tabsInBar), event: "searchClosed" }), hidden: true },
      brand(cfg),
      ...tabsInBar ? [tabBar(tabs, active)] : [],
      {
        type: "TextField",
        key: "q",
        hidden: true,
        flex: 1,
        kind: "search",
        maxLength: 200,
        ...twin("searchHint", "hintText", { name: [cfg.name, cfg.nameEn || cfg.name] }),
        onSubmitted: "search",
        trailingIcon: "search",
        ...twin("search", "trailingLabel"),
        onTrailingTap: "search"
      }
    ] },
    actions: [
      // barSearch: false (std 1.7.0): the plugin draws its own search field in its page instead of the bar's icon.
      ...cfg.barSearch ? [iconButton("searchButton", "search", "search", { ui: searchOpenOps(tabsInBar), event: "searchOpened" })] : [],
      // std 1.9.0: the page's own bar buttons (page.actions), before the settings gear.
      ...Array.isArray(ownActions) ? ownActions : [],
      iconButton("settingsButton", "settings", "settings", "openSettings")
    ]
  });
  return {
    type: "Scaffold",
    ...searching ? { onBack: { ui: searchClosedOps(tabsInBar), event: "searchClosed" } } : {},
    appBar,
    body: { type: "Column", key: "page", children: [
      ...withTabs && !tv ? [{ type: "Column", key: "tabsRow", padding: { compact: 0, expanded: 24 }, children: [tabBar(tabs, active)] }] : [],
      { type: "SingleChildScrollView", key: "browse-" + active, flex: 1, children: ownBlocks ? ownBlocks.filter((b) => b && Array.isArray(b.nodes) && b.nodes.length).flatMap((b, i) => b.edge ? b.nodes : [{ type: "Column", key: "block-" + i, padding: { compact: 12, expanded: 24 }, gap: 16, crossAxisAlignment: "stretch", children: b.nodes }]) : [...banner ? [banner] : [], { type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: body }] }
    ] },
    ...pending ? { every: { ms: POLL_MS, event: "tick" } } : {}
  };
}
function resultsView(cfg, { q, order, names, pending, found, device = "phone" }) {
  const body = [];
  let shown = 0;
  order.forEach((repo, i) => {
    const name = [names[repo] || repo, names[repo] || repo];
    if (pending.includes(repo)) {
      body.push({ type: "Column", key: "wait-" + i, gap: 8, children: [{ type: "Text", key: "waitText-" + i, color: "muted", ...twin("resultsSearching", "text", { name }) }, railSkeleton(i)] });
      return;
    }
    const r = found.get(repo);
    if (!r || !r.ok) {
      body.push({ type: "Text", key: "failed-" + i, color: "muted", ...twin("resultsFailed", "text", { name }) });
      return;
    }
    if (!r.items.length) return;
    shown++;
    body.push(rail({ items: r.items }, "found-" + i, twin("resultsIn", "title", { name }), cfg.imageHeaders));
  });
  if (!pending.length && shown === 0 && order.some((r) => {
    const x = found.get(r);
    return x && x.ok;
  })) body.unshift({ type: "Text", key: "noResults", ...twin("noResults") });
  return {
    type: "Scaffold",
    appBar: bar({ leading: iconButton("back", "arrow_back", "back", "back"), title: { type: "Text", key: "resultsTitle", style: "h4", ...twin("resultsTitle", "text", { q }) } }),
    body: { type: "SingleChildScrollView", key: "results-page", children: [{ type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: body }] },
    ...pending.length ? { every: { ms: 1500, event: "tick" } } : {}
  };
}
function settingsView(cfg, device = "phone") {
  return {
    type: "Scaffold",
    appBar: bar({ leading: iconButton("back", "arrow_back", "back", "back"), title: brand(cfg) }),
    body: { type: "SingleChildScrollView", key: "settings-page", children: [{ type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: [
      ...cfg.hasSettings ? [{ type: "settings", key: "form" }, { type: "Divider", key: "supportDivider" }] : [],
      supportNode(device)
    ] }] }
  };
}
function gateView(cfg, device = "phone") {
  const name = [cfg.name, cfg.nameEn || cfg.name];
  return {
    type: "Scaffold",
    appBar: bar({ leading: leaveButton(cfg), title: brand(cfg) }),
    body: { type: "Column", key: "gate", mainAxisAlignment: "center", crossAxisAlignment: "center", padding: 24, gap: 16, children: [
      { type: "Text", key: "gateTitle", style: "h3", ...twin("gateTitle") },
      { type: "Text", key: "gateText", style: "p", ...twin("gateText", "text", { name }) },
      { type: "ElevatedButton", key: "installResolver", ...twin("gateInstall", "labelText"), onPressed: { go: { installPlugin: { repo: RESOLVER_REPO } } } },
      supportNode(device)
    ] }
  };
}

// src/std/metaCache.js
var KEY = "meta3";
var MAX = 160;
var CONCURRENCY = 3;
var OVERVIEW_MAX = 160;
var HTTPS3 = /^https:\/\//;
function makeMetaCache({ kino: kino2, titleOf: titleOf2 = (c) => c.title, typeOf = (c) => c.kind === "series" ? "series" : "movie", tmdbPictures = false, clock = { now: () => Date.now() } }) {
  const usable = () => {
    try {
      return typeof kino2.meta === "function" && kino2.meta.byTitle === true;
    } catch (_) {
      return false;
    }
  };
  let book = null;
  function read() {
    if (book) return book;
    try {
      const o = JSON.parse(kino2.storage.get(KEY) || "null");
      book = o && typeof o === "object" && !Array.isArray(o) ? o : {};
    } catch (_) {
      book = {};
    }
    return book;
  }
  function write() {
    try {
      const ids = Object.keys(book);
      if (ids.length > MAX) for (const id of ids.slice(0, ids.length - MAX)) delete book[id];
      kino2.storage.set(KEY, JSON.stringify(book));
    } catch (_) {
    }
  }
  function known(id) {
    const e = read()[id];
    if (!e) return {};
    return {
      ...e.t > 0 ? { tmdb: e.t } : {},
      ...e.l && HTTPS3.test(e.l) ? { logo: e.l } : {},
      ...e.p && HTTPS3.test(e.p) ? { poster: e.p } : {},
      ...e.b && HTTPS3.test(e.b) ? { backdrop: e.b } : {},
      ...typeof e.o === "string" && e.o ? { overview: e.o } : {}
    };
  }
  const asked = (id) => Object.hasOwn(read(), id);
  function dress(cards) {
    return cards.map((c) => {
      const k = known(c.id);
      const poster = tmdbPictures && k.poster ? k.poster : null;
      if (!k.tmdb && !poster) return c;
      return { ...c, ...k.tmdb && !(c.ids && c.ids.tmdb) ? { ids: { ...c.ids || {}, tmdb: k.tmdb } } : {}, ...poster ? { poster } : {} };
    });
  }
  async function fill2(cards, budgetMs) {
    if (!usable()) return 0;
    const b = read();
    const end = clock.now() + budgetMs;
    let count = 0;
    let stop = false;
    const seen = /* @__PURE__ */ new Set();
    const todo = cards.filter((c) => {
      if (!c || typeof c.id !== "string" || seen.has(c.id) || Object.hasOwn(b, c.id) || c.ids && c.ids.tmdb && c.noLogo) return false;
      seen.add(c.id);
      return true;
    });
    let next = 0;
    const str = (v, max) => typeof v === "string" ? v.slice(0, max) : "";
    const worker = async () => {
      while (!stop && next < todo.length && clock.now() < end) {
        const c = todo[next++];
        const year = c.year !== void 0 ? { year: c.year } : {};
        try {
          const a = await kino2.meta({ type: typeOf(c), title: titleOf2(c), ...year });
          b[c.id] = {
            t: a && a.ids && Number.isInteger(a.ids.tmdb) ? a.ids.tmdb : 0,
            l: str(a && a.logo, 2048),
            p: str(a && a.poster, 2048),
            b: str(a && a.backdrop, 2048),
            o: str(a && a.overview, OVERVIEW_MAX)
          };
          count++;
        } catch (e) {
          if (e && e.code === "rate_limited") stop = true;
        }
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    if (count > 0) write();
    return count;
  }
  return { known, asked, dress, fill: fill2, usable, tmdbPictures };
}

// src/std/index.js
var TAB_KEY = "browseTab";
var SNAP_PREFIX = "browse1:";
var SNAP_TTL_MS = 7 * 24 * 3600 * 1e3;
var SNAP_MAX = 20 * 1024;
var SNAPS_TOTAL = 96 * 1024;
var RECENT_KEY = "recent1";
var RECENT_MAX = 12;
var Q_MAX = 200;
var META_TICK_MS = 3e3;
var META_TICK_CARDS = 24;
var INFLIGHT_KEY = "std:inflight";
var INFLIGHT_STALE_MS = 18e3;
var MAX_META_TICKS = 10;
var DEFAULT_TABS = [{ id: "inicio", label: "Inicio", labelEn: "Home" }];
var SNAPSHOT_VERSION = 1;
var SNAPSHOT_MAX_AGE_MS = 24 * 60 * 60 * 1e3;
var SNAPSHOT_TIMEOUT_MS = 8e3;
var snapshotUrl = (repo, tab) => "https://raw.githubusercontent.com/" + repo + "/main/home/" + encodeURIComponent(tab) + ".json";
function snapshotRows(text, tab, now = Date.now()) {
  let o;
  try {
    o = JSON.parse(String(text));
  } catch (_) {
    return null;
  }
  if (!o || o.v !== SNAPSHOT_VERSION || o.tab !== tab || !Array.isArray(o.rows) || o.rows.length === 0) return null;
  const at = Number(o.at);
  if (!Number.isFinite(at) || now - at > SNAPSHOT_MAX_AGE_MS || at - now > 60 * 60 * 1e3) return null;
  return o.rows;
}
var lastSource = null;
function makeStandardScreen({ kino: kino2, name, nameEn, logo = null, logoAspect = "1:1", needsResolver, hasSettings, tabs, loadTab: loadTab2, homeKey = null, titleOf: titleOf2, typeOf, tmdbPictures = false, imageHeaders = null, searchHere = null, page = null, barSearch = true, backArrow = true, snapshot = null }) {
  const cfg = { name, nameEn, logo, logoAspect, imageHeaders, hasSettings: !!hasSettings, barSearch: barSearch !== false, backArrow: backArrow !== false, tabs: Array.isArray(tabs) && tabs.length > 0 ? tabs : DEFAULT_TABS };
  const TAB_IDS = cfg.tabs.map((t2) => t2.id);
  lastSource = { tabs: cfg.tabs, loadTab: loadTab2, titleOf: titleOf2, typeOf };
  async function fromSnapshot(tab) {
    if (typeof snapshot !== "string" || !/^[\w.-]+\/[\w.-]+$/.test(snapshot)) return null;
    try {
      const r = await kino2.fetch(snapshotUrl(snapshot, tab), { timeoutMs: SNAPSHOT_TIMEOUT_MS });
      if (!r || !r.ok) return null;
      const rows = snapshotRows(await r.text(), tab);
      return rows ? { rows } : null;
    } catch (_) {
      return null;
    }
  }
  const meta = makeMetaCache({ kino: kino2, titleOf: titleOf2, typeOf, tmdbPictures });
  function slidesFromMeta(rails) {
    const out = [];
    for (const r of rails) {
      for (const c of r.items) {
        if (out.length >= MAX_SLIDES) return out;
        const k = meta.known(c.id);
        if (!k.backdrop || c.adult === true || out.some((x) => x.id === c.id)) continue;
        out.push({ id: c.id, ref: c.ref, kind: c.kind, title: c.title, image: k.backdrop, text: slideText(k.overview, c), ...k.logo ? { logo: k.logo } : {} });
      }
    }
    return out;
  }
  const enrich = (data) => {
    if (!data) return data;
    const own = data.slides.map((s) => {
      const k = meta.known(s.id);
      const image = tmdbPictures && k.backdrop ? k.backdrop : null;
      return k.logo || image ? { ...s, ...k.logo ? { logo: k.logo } : {}, ...image ? { image } : {} } : s;
    });
    const learned = own.length > 0 ? [] : slidesFromMeta(data.rails);
    return {
      // The site's own backdrops, else TMDB's, else the posters: every plugin has a hero.
      slides: own.length > 0 ? own : learned.length > 0 ? learned : data.posterSlides || [],
      rails: data.rails.map((r) => ({ ...r, items: meta.dress(r.items) }))
    };
  };
  const metaTicks = /* @__PURE__ */ new Map();
  const found = /* @__PURE__ */ new Map();
  const SOURCES_PER_TICK = 3;
  const asFound = (a, index) => ({
    ok: !!(a && a.ok),
    items: a && a.ok && Array.isArray(a.items) ? a.items.filter((x) => x && x.id && x.ref && x.title).slice(0, 40).map((x) => ({ ...x, id: ("p" + index + "~" + x.id).slice(0, 128), origin: a.repo })) : []
  });
  const memo = /* @__PURE__ */ new Map();
  const log = (...a) => {
    try {
      kino2.log("[std]", ...a);
    } catch (_) {
    }
  };
  const get = (k) => {
    try {
      return kino2.storage.get(k);
    } catch (_) {
      return null;
    }
  };
  const set = (k, v, opts) => {
    try {
      kino2.storage.set(k, v, opts);
    } catch (_) {
    }
  };
  function readSnap(tab) {
    try {
      const o = JSON.parse(get(SNAP_PREFIX + tab) || "null");
      return o && Date.now() - o.at < SNAP_TTL_MS && o.data && Array.isArray(o.data.rails) ? o.data : null;
    } catch (_) {
      return null;
    }
  }
  const snapMax = Math.min(SNAP_MAX, Math.floor(SNAPS_TOTAL / TAB_IDS.length));
  function writeSnap(tab, data) {
    for (let per = 10; per >= 3; per -= 2) {
      const slim = { slides: data.slides, posterSlides: data.posterSlides || [], rails: data.rails.map((r) => ({ ...r, items: r.items.slice(0, per) })) };
      const text = JSON.stringify({ at: Date.now(), data: slim });
      if (text.length <= snapMax) {
        set(SNAP_PREFIX + tab, text, { ttlMs: SNAP_TTL_MS });
        return;
      }
    }
  }
  function homeSeed(tab) {
    if (!homeKey || tab !== TAB_IDS[0]) return null;
    try {
      const o = JSON.parse(get(homeKey) || "null");
      return o && Array.isArray(o.rows) && o.rows.length ? tabOf({ rows: o.rows }) : null;
    } catch (_) {
      return null;
    }
  }
  const stored = () => {
    const t2 = get(TAB_KEY);
    return TAB_IDS.includes(t2) ? t2 : null;
  };
  function dataOf(tab) {
    if (memo.has(tab)) return memo.get(tab).data;
    const snap = readSnap(tab) || homeSeed(tab);
    if (snap) {
      memo.set(tab, { data: snap, whole: false });
      return snap;
    }
    return null;
  }
  const readKeys = () => {
    try {
      const a = JSON.parse(get(RECENT_KEY) || "[]");
      return Array.isArray(a) ? a.filter((k) => typeof k === "string") : [];
    } catch (_) {
      return [];
    }
  };
  function notePlayed(ref) {
    try {
      const key = playedKey(ref);
      if (key === "" || key.startsWith("x|")) return;
      const keys = readKeys();
      if (keys[0] === key) return;
      set(RECENT_KEY, JSON.stringify([key, ...keys.filter((k) => k !== key)].slice(0, RECENT_MAX)));
    } catch (_) {
    }
  }
  const tabFromArgs = (route) => {
    const a = route && route.args && typeof route.args === "object" ? route.args : {};
    return TAB_IDS.includes(a.tab) ? a.tab : null;
  };
  function needed(tab) {
    return memo.get(tab) && memo.get(tab).whole ? [] : [tab];
  }
  function screen2(ctx) {
    const c = ctx || {};
    const device = c.device || "phone";
    if (needsResolver && !(c.installed && c.installed[RESOLVER_REPO])) return gateView(cfg, device);
    if (c.route && c.route.name === "settings") return settingsView(cfg, device);
    if (searchHere && c.route && c.route.name === "results") {
      const st0 = c.state && typeof c.state === "object" ? c.state : {};
      return resultsView(cfg, {
        q: String(st0.rq || ""),
        order: Array.isArray(st0.rorder) ? st0.rorder : [],
        names: st0.rnames || {},
        pending: Array.isArray(st0.rpending) ? st0.rpending : [],
        found,
        device
      });
    }
    const st = c.state && typeof c.state === "object" ? c.state : {};
    const tab = TAB_IDS.includes(st.tab) ? st.tab : tabFromArgs(c.route) ?? stored() ?? TAB_IDS[0];
    const data = enrich(dataOf(tab));
    const loaded = TAB_IDS.map((t2) => memo.get(t2)).filter(Boolean).map((m) => m.data);
    const pending = Array.isArray(st.pending) && st.pending.length > 0;
    const searching = st.searching === true;
    if (page) {
      const tree = browseView(cfg, {
        tab: TAB_IDS[0],
        data: null,
        recent: [],
        pending: false,
        failed: false,
        searching,
        device,
        own: page.view({ ...c, state: st }) || [],
        ownActions: page.actions ? page.actions({ ...c, state: st }) || [] : []
      });
      const every = page.every ? page.every({ ...c, state: st }) : null;
      return every ? { ...tree, every } : tree;
    }
    return browseView(cfg, { tab, data, recent: meta.dress(recentOf(readKeys(), loaded)), pending, failed: !!(st.failed && st.failed[tab]), searching, device });
  }
  function cutShort() {
    try {
      const o = JSON.parse(get(INFLIGHT_KEY) || "null");
      if (!o || typeof o.tab !== "string") return null;
      if (Date.now() - Number(o.at) < INFLIGHT_STALE_MS) return null;
      kino2.storage.remove(INFLIGHT_KEY);
      return o.tab;
    } catch (_) {
      return null;
    }
  }
  async function load(tab) {
    set(INFLIGHT_KEY, JSON.stringify({ tab, at: Date.now() }));
    let page2;
    try {
      page2 = await fromSnapshot(tab) || await loadTab2(tab);
    } finally {
      try {
        kino2.storage.remove(INFLIGHT_KEY);
      } catch (_) {
      }
    }
    const data = tabOf(page2);
    if (data) {
      memo.set(tab, { data, whole: true });
      writeSnap(tab, data);
    }
    return data !== null;
  }
  const events = {
    async open(ev) {
      if (page) {
        let patch = {};
        try {
          patch = (page.open ? await page.open(ev) : {}) || {};
        } catch (e) {
          log("page open", e && e.code || "error");
        }
        return { state: { ...patch, tab: TAB_IDS[0], pending: [], failed: null } };
      }
      return events.openTabs(ev);
    },
    openTabs({ route, state, device }) {
      const tab = tabFromArgs(route) ?? (TAB_IDS.includes(state.tab) ? state.tab : stored() ?? TAB_IDS[0]);
      for (const t2 of TAB_IDS) dataOf(t2);
      return { state: { tab, pending: needed(tab), failed: null } };
    },
    tab({ value, arg, state }) {
      const tab = TAB_IDS.includes(value) ? value : TAB_IDS.includes(arg) ? arg : null;
      if (!tab) return null;
      set(TAB_KEY, tab);
      dataOf(tab);
      const failed = { ...state.failed || {} };
      delete failed[tab];
      const pending = [tab, ...Array.isArray(state.pending) ? state.pending.filter((t2) => t2 !== tab) : []];
      return { state: { tab, pending: memo.get(tab) && memo.get(tab).whole ? pending.slice(1) : pending, failed } };
    },
    retry({ state }) {
      const tab = TAB_IDS.includes(state.tab) ? state.tab : TAB_IDS[0];
      const queued = Array.isArray(state.pending) ? state.pending.filter((t2) => t2 !== tab) : [];
      return { state: { failed: null, pending: [tab, ...queued] } };
    },
    async tick({ state, route }) {
      if (searchHere && route && route.name === "results") {
        const rp = Array.isArray(state.rpending) ? state.rpending : [];
        if (rp.length === 0) return null;
        const batch = rp.slice(0, SOURCES_PER_TICK);
        const order = Array.isArray(state.rorder) ? state.rorder : [];
        let answers2 = [];
        try {
          answers2 = await searchHere.searchIn(String(state.rq || ""), batch);
        } catch (e) {
          log("results", (e && e.code || "error") + " " + String(e && e.message || "").slice(0, 200));
        }
        for (const repo of batch) {
          const a = (Array.isArray(answers2) ? answers2 : []).find((x) => x && x.repo === repo);
          found.set(repo, asFound(a, order.indexOf(repo)));
        }
        return { state: { rpending: rp.slice(SOURCES_PER_TICK) } };
      }
      const pending = Array.isArray(state.pending) ? state.pending : [];
      if (pending.length === 0) return null;
      const [next, ...rest] = pending;
      const failed = { ...state.failed || {} };
      if (next.startsWith("meta:")) {
        const tab = next.slice(5);
        const m = memo.get(tab);
        if (!m) return { state: { pending: rest } };
        const ask = (x) => ({ id: x.id, title: x.title, kind: x.kind, ...x.year !== void 0 ? { year: x.year } : {} });
        const noOwnSlides = m.data.slides.length === 0;
        const cards = [...m.data.slides.map(ask), ...m.data.rails.flatMap((r) => r.items.slice(0, noOwnSlides ? MAX_SLIDES * 3 : 6).map(ask))].filter((c) => !meta.asked(c.id)).slice(0, META_TICK_CARDS);
        const count = await meta.fill(cards, META_TICK_MS);
        const ticks = (metaTicks.get(tab) || 0) + 1;
        metaTicks.set(tab, ticks);
        const again = noOwnSlides && count > 0 && ticks < MAX_META_TICKS && slidesFromMeta(m.data.rails).length < MAX_SLIDES && cards.some((c) => !meta.asked(c.id));
        return { state: { pending: again ? [next, ...rest] : rest } };
      }
      if (cutShort() === next) {
        log("tab", next, "cut short by Kino last time");
        failed[next] = true;
        return { state: { pending: rest, failed } };
      }
      try {
        const ok = await load(next);
        if (!ok) failed[next] = true;
        else delete failed[next];
        if (ok && meta.usable()) rest.unshift("meta:" + next);
      } catch (e) {
        log("tab", e && e.code || "error");
        failed[next] = true;
      }
      return { state: { pending: rest, failed } };
    },
    // The words go to Kino's own search, with this plugin as the source; the bar is put back as it was, locally.
    // The search button's own event (after its local ops): while searching, the tree declares onBack, so Back closes the box.
    searchOpened() {
      return { state: { searching: true } };
    },
    // The box was closed (its arrow, or Back through onBack, already ran the local ops): the flag and the ops go, so the next
    // tree declares no onBack and draws the bar's defaults.
    searchClosed() {
      return { state: { searching: false, ui: null } };
    },
    async search({ value, state, device }) {
      const typed = value && typeof value === "object" ? value.q : value;
      const raw = typed != null && String(typed).trim() !== "" ? typed : state.inputs && state.inputs.q;
      const q = String(raw == null ? "" : raw).trim().slice(0, Q_MAX);
      if (!q) return null;
      const closed = searchClosedOps(device === "tv" && TAB_IDS.length > 1);
      if (searchHere) {
        let sources = [];
        try {
          sources = await searchHere.sources() || [];
        } catch (e) {
          log("sources", e && e.code || "error");
        }
        const order = sources.map((x) => x.repo).filter((r) => typeof r === "string");
        found.clear();
        return { route: { push: "results" }, ui: closed, state: {
          searching: false,
          ui: null,
          rq: q,
          rorder: order,
          rnames: Object.fromEntries(sources.map((x) => [x.repo, String(x.name || x.repo)])),
          rpending: order
        } };
      }
      return { go: { search: { q } }, ui: closed, state: { searching: false, ui: null } };
    },
    openSettings() {
      return { route: { push: "settings" }, state: { fromBrowse: true } };
    },
    back({ state, route }) {
      if (route && route.name === "settings" && !state.fromBrowse) return { close: true };
      return { route: { pop: true }, state: { fromBrowse: false } };
    }
  };
  async function screenEvent2(ev) {
    const e = ev || {};
    const name2 = e.name != null ? e.name : e.event;
    const own = page && page.events && typeof name2 === "string" && Object.hasOwn(page.events, name2) && !Object.hasOwn(events, name2) ? page.events[name2] : null;
    if (own) return await own({ ...e, state: e.state || {} }) ?? null;
    const handler = typeof name2 === "string" && name2 !== "openTabs" && Object.hasOwn(events, name2) ? events[name2] : null;
    return handler ? await handler({ ...e, state: e.state || {} }) ?? null : null;
  }
  return { screen: screen2, screenEvent: screenEvent2, notePlayed };
}

// src/std/rank.js
async function scoresFromResolver(kino2, urls) {
  if (!Array.isArray(urls) || urls.length === 0) return null;
  try {
    const r = await kino2.plugins.call("resolver", "rank", { urls: urls.slice(0, 64).map(String) });
    const s = r && Array.isArray(r.scores) ? r.scores : null;
    return s && s.length === Math.min(urls.length, 64) ? s : null;
  } catch (_) {
    return null;
  }
}

// src/logo.js
var LOGO = "data:image/png;base64,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";
var LOGO_ASPECT = "1:1";

// src/i18n.js
var T = {
  needResolver: ["Instala el motor de reproducci\xF3n para ver esto. Es gratis y se hace una sola vez.", "Install the playback engine to watch this. It is free and done once."],
  noServer: ["Este episodio no tiene ahora un servidor que abra. Intenta de nuevo m\xE1s tarde.", "This episode has no server that opens right now. Try again later."],
  siteDown: ["El sitio no responde ahora. Intenta de nuevo en un rato.", "The site is not answering right now. Try again in a moment."]
};
function both(key, vars = {}) {
  const pair = T[key] || [key, key];
  const fill2 = (s) => s.replace(/\{(\w+)\}/g, (_, k) => k in vars ? String(vars[k]) : "");
  return { es: fill2(pair[0]), en: fill2(pair[1]) };
}
function t(kino2, key, vars) {
  const w = both(key, vars);
  return String(kino2 && kino2.lang || "").toLowerCase().startsWith("es") ? w.es : w.en;
}

// src/std/catalog.js
var CATALOG_MAX = 40;
var OVERVIEW_MAX2 = 300;
var HTTPS4 = /^https:\/\//;
function catalogItems(found) {
  const out = [];
  const list = Array.isArray(found) ? found : found && Array.isArray(found.items) ? found.items : [];
  for (const it of list) {
    if (out.length >= CATALOG_MAX) break;
    if (!it || typeof it.id !== "string" || !it.id || typeof it.ref !== "string" || !it.ref || typeof it.title !== "string" || !it.title) continue;
    const item = { id: it.id, ref: it.ref, title: it.title, kind: typeof it.kind === "string" && it.kind ? it.kind : "movie" };
    if (typeof it.poster === "string" && HTTPS4.test(it.poster)) item.poster = it.poster;
    if (typeof it.backdrop === "string" && HTTPS4.test(it.backdrop)) item.backdrop = it.backdrop;
    if (it.year !== void 0 && it.year !== null && String(it.year)) item.year = String(it.year);
    if (typeof it.overview === "string" && it.overview.trim()) item.overview = it.overview.trim().slice(0, OVERVIEW_MAX2);
    const tmdb = it.ids && Number.isInteger(it.ids.tmdb) ? it.ids.tmdb : Number.isInteger(it.tmdb) ? it.tmdb : 0;
    if (tmdb > 0) item.tmdb = tmdb;
    out.push(item);
  }
  return out;
}
function catalogQuery(arg) {
  const q = String(arg && arg.q || "").trim().slice(0, 200);
  const type = arg && (arg.type === "movie" || arg.type === "series") ? arg.type : "any";
  return { q, type, season: 0, episode: 0, tmdbId: 0, year: 0, originalTitle: "", altTitles: [], cursor: null };
}
function catalogDoor(search2) {
  return async (arg) => {
    const query = catalogQuery(arg);
    if (!query.q) return [];
    return catalogItems(await search2(query));
  };
}

// src/plugin.js
globalThis.__kinoDropPendingFetches = true;
var MAX_COPIES = 8;
var TRY_AT_ONCE = 3;
var CALL_MS = 16e3;
var SLIDE_DETAILS = 5;
var LISTS = {
  emision: { path: "/emision", es: "En emisi\xF3n", en: "Airing now" },
  animes: { path: "/animes", es: "Todos los animes", en: "All anime" },
  "c:Pel\xEDcula": { cat: "Pel\xEDcula", es: "Pel\xEDculas", en: "Movies" },
  "c:Pel\xEDcula Latino": { cat: "Pel\xEDcula Latino", es: "Pel\xEDculas en latino", en: "Movies in Latino" },
  "c:Pel\xEDcula Castellano": { cat: "Pel\xEDcula Castellano", es: "Pel\xEDculas en castellano", en: "Movies in Castilian" },
  "c:pelicula-1080p": { cat: "pelicula-1080p", es: "Pel\xEDculas en 1080p", en: "1080p movies" },
  "c:latino": { cat: "latino", es: "Doblado al latino", en: "Dubbed in Latino" },
  "c:castellano": { cat: "castellano", es: "Doblado al castellano", en: "Dubbed in Castilian" },
  "c:ova": { cat: "ova", es: "OVAs", en: "OVAs" },
  "c:donghua": { cat: "donghua", es: "Donghua", en: "Donghua" },
  "g:accion": { genre: "accion", es: "Acci\xF3n", en: "Action" },
  "g:aventura": { genre: "aventura", es: "Aventura", en: "Adventure" },
  "g:comedia": { genre: "comedia", es: "Comedia", en: "Comedy" },
  "g:drama": { genre: "drama", es: "Drama", en: "Drama" },
  "g:fantasia": { genre: "fantasia", es: "Fantas\xEDa", en: "Fantasy" },
  "g:romance": { genre: "romance", es: "Romance", en: "Romance" },
  "g:shonen": { genre: "shonen", es: "Shonen", en: "Shonen" },
  "g:sobrenatural": { genre: "sobrenatural", es: "Sobrenatural", en: "Supernatural" },
  "g:ciencia-ficcion": { genre: "ciencia-ficcion", es: "Ciencia ficci\xF3n", en: "Sci-fi" },
  "g:escolares": { genre: "escolares", es: "Escolares", en: "School" }
};
var TABS = [
  { id: "inicio", es: "Inicio", en: "Home", lists: ["emision", "animes", "c:Pel\xEDcula", "g:accion", "g:comedia", "g:romance"] },
  { id: "emision", es: "En emisi\xF3n", en: "Airing", lists: ["emision", "c:latino", "c:castellano", "c:ova"] },
  { id: "peliculas", es: "Pel\xEDculas", en: "Movies", lists: ["c:Pel\xEDcula", "c:Pel\xEDcula Latino", "c:Pel\xEDcula Castellano", "c:pelicula-1080p"] },
  { id: "generos", es: "G\xE9neros", en: "Genres", lists: ["g:accion", "g:aventura", "g:comedia", "g:drama", "g:fantasia", "g:shonen", "g:sobrenatural", "g:ciencia-ficcion"] }
];
function listUrl(ref, page = 1) {
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
  if (!url) return { items: [], next: void 0 };
  const html = await pageText(url);
  return { items: parseCards(html), next: hasNext(html) ? String(page + 1) : void 0 };
}
var rowOf = (ref, items) => ({ id: ref.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "-"), title: LISTS[ref].es, titleEn: LISTS[ref].en, ref, items });
async function settledWithin(ms, work) {
  let done = false;
  Promise.resolve(work).then(() => {
    done = true;
  }, () => {
    done = true;
  });
  const end = Date.now() + ms;
  while (!done && Date.now() < end) await kino.sleep(Math.min(250, Math.max(1, end - Date.now())));
  return done;
}
var ROWS_BUDGET_MS = 11e3;
async function rowsOfLists(refs) {
  const out = refs.map(() => null);
  const all = Promise.all(refs.map(async (ref, i) => {
    try {
      const p = await listing(ref, 1);
      out[i] = p.items.length ? rowOf(ref, p.items) : null;
    } catch (_) {
    }
  }));
  await settledWithin(ROWS_BUDGET_MS, all);
  return out.filter(Boolean);
}
async function home() {
  const out = await rowsOfLists(["emision", "animes", "c:Pel\xEDcula", "g:accion", "g:comedia"]);
  if (!out.length) throw kino.error("unavailable", "no list answered", { userMessage: t(kino, "siteDown") });
  return out.map(({ titleEn, ...row }) => ({ ...row, genre: "anime" }));
}
async function browse(ref, cursor) {
  const page = Math.max(1, parseInt(cursor, 10) || 1);
  return listing(ref, page);
}
async function search(query) {
  const q = String(query && query.q || "").trim();
  if (!q) return [];
  const html = await pageText(SITE + "/buscar?q=" + encodeURIComponent(q));
  return parseCards(html).slice(0, 60);
}
async function episodes(ref) {
  if (!/^[\w-]{1,160}$/.test(String(ref || ""))) throw kino.error("not_found");
  const info = parseAnime(await pageText(SITE + "/anime/" + ref));
  if (!info) throw kino.error("not_found", "no such anime");
  const list = info.episodes.map((e) => ({ season: 1, number: Math.min(99999, Math.max(1, Math.floor(e.number))), ref: e.ref, title: e.title, ...e.still ? { still: e.still } : {} }));
  list.sort((a, b) => a.number - b.number);
  return {
    series: { title: info.title, overview: info.overview, poster: info.poster, backdrop: info.backdrop, genres: info.genres },
    episodes: list
  };
}
var PREFER = ["streamwish", "vidhide", "mp4upload", "mixdrop", "uqload", "hexload", "okru", "lulu", "voe", "byse", "streamtape", "dood", "savefiles"];
var NEEDS_BROWSER = /* @__PURE__ */ new Set(["voe", "savefiles"]);
var FAMILIES = [
  ["streamwish", /streamwish|hglink|hlswish|vibuxer|swdyu|embedwish|playerwish|iplayerhls|wishembed/i],
  ["vidhide", /vidhide|mivalyo|morencius|callistanise|filelions|smoothpre|minochinos|dintezuvio/i],
  ["mp4upload", /mp4upload/i],
  ["mixdrop", /mixdrop|mxdrop/i],
  ["uqload", /uqload/i],
  ["hexload", /hexload/i],
  ["okru", /(^|\.)ok\.ru$|okru/i],
  ["lulu", /luluvdo|lulustream|luluvid/i],
  ["voe", /(^|\.)voe\.sx$|voe/i],
  ["byse", /filemoon|bysekoze|bysewihe|byse/i],
  ["streamtape", /streamtape/i],
  ["dood", /dood|dsvplay|d0+d|ds2play|playmogo/i],
  ["savefiles", /savefiles/i],
  ["goodstream", /goodstream/i],
  ["vimeos", /vimeos/i],
  ["fastream", /fastream/i],
  ["nupload", /nupload/i]
];
function kindOf(link) {
  const host = hostName(link);
  const hit = FAMILIES.find(([, rx]) => rx.test(host));
  return hit ? hit[0] : host;
}
function rankOf(name) {
  const i = PREFER.indexOf(name);
  return i < 0 ? PREFER.length : i;
}
var STATS_KEY = "srvStats";
var STATS_CAP = 24;
function serverScores() {
  let all = {};
  try {
    all = JSON.parse(kino.storage.get(STATS_KEY) || "{}") || {};
  } catch (_) {
    all = {};
  }
  return (name) => {
    const s = all[name] || { ok: 0, fail: 0 };
    return (s.ok + 1) / (s.ok + s.fail + 2);
  };
}
function noteServer(name, ok) {
  try {
    const all = JSON.parse(kino.storage.get(STATS_KEY) || "{}") || {};
    const s = all[name] || { ok: 0, fail: 0 };
    s[ok ? "ok" : "fail"] += 1;
    if (s.ok + s.fail > STATS_CAP) {
      s.ok = Math.round(s.ok / 2);
      s.fail = Math.round(s.fail / 2);
    }
    all[name] = s;
    kino.storage.set(STATS_KEY, JSON.stringify(all));
  } catch (_) {
  }
}
function serversOf(html, preferred = "", score = null, ranks = null) {
  const list = parsePlayers(html).map((p, n) => ({ ...p, n, kind: kindOf(p.link), _r: ranks && typeof ranks.get(p.link) === "number" ? ranks.get(p.link) : null }));
  const pref = (k) => preferred && k === preferred ? 0 : 1;
  const tier = (k) => NEEDS_BROWSER.has(k) || !PREFER.includes(k) ? 1 : 0;
  const learned = (k) => score ? -score(k) : 0;
  if (ranks) return list.sort((a, b) => pref(a.kind) - pref(b.kind) || learned(a.kind) - learned(b.kind) || (b._r ?? 0) - (a._r ?? 0) || a.n - b.n).slice(0, MAX_COPIES);
  return list.sort((a, b) => pref(a.kind) - pref(b.kind) || tier(a.kind) - tier(b.kind) || learned(a.kind) - learned(b.kind) || rankOf(a.kind) - rankOf(b.kind) || a.n - b.n).slice(0, MAX_COPIES);
}
var labelOf = (s) => (s.name + " \xB7 " + hostName(s.link)).slice(0, 48);
function hostName(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch (_) {
    return "servidor";
  }
}
var HLS = "application/vnd.apple.mpegurl";
var CAPTURE_MS = 2e4;
async function resolverInstalled() {
  try {
    await kino.plugins.call("resolver", "normalizeHost", { url: "https://probe.invalid/" });
    return true;
  } catch (e) {
    return (e && e.code) !== "provider_missing";
  }
}
function toStream(s) {
  const headers = { "User-Agent": UA };
  if (s.referer) headers.Referer = s.referer;
  if (Array.isArray(s.headers)) {
    for (const h of s.headers) if (h && h.name) headers[h.name] = String(h.value);
  } else if (s.headers && typeof s.headers === "object") Object.assign(headers, s.headers);
  return { url: s.url, mime: s.kind === "hls" ? HLS : /\.mp4(\?|$)/i.test(s.url) ? "video/mp4" : HLS, headers };
}
async function answers(stream) {
  try {
    const r = await kino.fetch(stream.url, { headers: { ...stream.headers, Range: "bytes=0-2047" }, timeoutMs: 5e3, maxBytes: 2048 });
    if (r.status === 401 || r.status === 403) return true;
    if (!r.ok) return false;
    return !/\.m3u8(\?|$)/i.test(stream.url) || /^\s*#EXTM3U/.test(r.text() || "");
  } catch (e) {
    return !!(e && (e.code === "host_not_allowed" || e.code === "too_large" || e.code === "timeout"));
  }
}
async function captureOpen(link, budget) {
  if (!kino.browser || typeof kino.browser.capture !== "function" || !budget || budget.captures <= 0) return null;
  budget.captures -= 1;
  try {
    const page = await kino.browser.capture(link, { timeoutMs: CAPTURE_MS, match: "\\.m3u8|\\.mp4", headers: { Referer: SITE + "/" } });
    const media = page && page.media || [];
    const best = media.find((x) => /m3u8/i.test(x.url)) || media[0];
    if (!best) return null;
    return { url: best.url, mime: best.mime || (/\.mp4/i.test(best.url) ? "video/mp4" : HLS), headers: best.headers || { Referer: link } };
  } catch (e) {
    kino.log("[todoanime] capture", e && e.code || "failed");
    return null;
  }
}
async function resolve(ref) {
  if (!await resolverInstalled()) throw kino.error("unavailable", "resolver missing", { userMessage: t(kino, "needResolver") });
  const [slug, pick] = String(ref || "").split("|");
  if (!/^[\w-]{1,160}$/.test(slug)) throw kino.error("not_found");
  let preferred = "";
  try {
    preferred = String(kino.config.get("server") || "");
  } catch (_) {
  }
  const html = await pageText(SITE + "/ver/" + slug);
  const links = parsePlayers(html).map((p) => p.link);
  const scores = await scoresFromResolver(kino, links);
  const ranks = scores ? new Map(links.map((l, i) => [l, scores[i]])) : null;
  const servers = serversOf(html, preferred === "auto" ? "" : preferred, serverScores(), ranks);
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const deadline = Date.now() + CALL_MS;
  const budget = { captures: 2 };
  const openOne = async (s) => {
    try {
      const res = await kino.plugins.call("resolver", "resolve", { url: s.link, referer: SITE + "/" });
      const st = (res && Array.isArray(res.streams) ? res.streams : []).find((x) => x && x.url);
      if (st) {
        const out2 = toStream(st);
        return await answers(out2) ? out2 : null;
      }
      if (res && res.error === "dead") return null;
    } catch (_) {
    }
    return captureOpen(s.link, budget);
  };
  const open = async (s) => {
    const out2 = await openOne(s);
    noteServer(s.kind, !!out2);
    return out2;
  };
  if (pick !== void 0) {
    const s = servers.find((x) => String(x.n) === pick);
    const stream = s && await open(s);
    if (!stream) throw kino.error("not_found", "that server did not open");
    return { ...stream, label: labelOf(s) };
  }
  const opened = new Array(servers.length).fill(null);
  let at = -1;
  for (let from = 0; from < servers.length && at < 0 && Date.now() < deadline - 1500; from += TRY_AT_ONCE) {
    const got = await Promise.all(servers.slice(from, from + TRY_AT_ONCE).map(open));
    got.forEach((g, i) => {
      opened[from + i] = g;
    });
    at = opened.findIndex(Boolean);
  }
  if (at < 0) throw kino.error("not_found", "no server opened", { userMessage: t(kino, "noServer") });
  const first = servers[at];
  const alternatives = servers.filter((s) => s !== first).map((s) => {
    const i = servers.indexOf(s);
    return opened[i] ? { ...opened[i], label: labelOf(s) } : { label: labelOf(s), ref: slug + "|" + s.n };
  }).slice(0, MAX_COPIES - 1);
  const out = { ...opened[at], label: labelOf(first), alternatives };
  try {
    standard().notePlayed(seriesOfEpisode(slug));
  } catch (_) {
  }
  return out;
}
async function loadTab(tabId) {
  const tab = TABS.find((x) => x.id === tabId);
  if (!tab) return { rows: [] };
  const rows = await rowsOfLists(tab.lists);
  if (rows.length && tab.id === "inicio") {
    const head = rows[0].items.slice(0, SLIDE_DETAILS);
    const details = head.map(() => null);
    await settledWithin(5e3, Promise.all(head.map(async (it, i) => {
      try {
        details[i] = parseAnime(await pageText(SITE + "/anime/" + it.ref));
      } catch (_) {
      }
    })));
    head.forEach((it, i) => {
      if (details[i]) {
        it.overview = details[i].overview;
        if (details[i].backdrop) it.backdrop = details[i].backdrop;
      }
    });
  }
  return { rows };
}
function metaTitle(title) {
  return String(title || "").replace(/\s+(?:latino|castellano|subtitulado|japon[eé]s|sub espa[nñ]ol)\s*$/i, "").replace(/\s+\((?:\d{4}|latino|castellano)\)\s*$/i, "").replace(/\s+(?:S\d+|temporada\s*\d+|\d+(?:st|nd|rd|th)\s+season)\s*$/i, "").replace(/\s*[:\-–]?\s*(?:la\s+)?pel[ií]culas?\s*$/i, "").replace(/\s+(?:latino|castellano|subtitulado|japon[eé]s)\s*$/i, "").replace(/[\s,:;\-–]+$/, "").trim();
}
var metaType = (title) => /pel[ií]culas?/i.test(String(title || "")) ? "movie" : "series";
var std = null;
var standard = () => std ?? (std = makeStandardScreen({
  snapshot: "xuper-plugin/kino-plugin-latanime",
  kino,
  name: "TodoAnime",
  logo: LOGO,
  logoAspect: LOGO_ASPECT,
  needsResolver: true,
  hasSettings: true,
  tabs: [
    { id: "inicio", label: "Inicio", labelEn: "Home" },
    { id: "emision", label: "En emisi\xF3n", labelEn: "Airing" },
    { id: "peliculas", label: "Pel\xEDculas", labelEn: "Movies" },
    { id: "generos", label: "G\xE9neros", labelEn: "Genres" }
  ],
  loadTab,
  titleOf: (c) => metaTitle(c.title),
  typeOf: (c) => metaType(c.title),
  // The site's thumbnails sit behind Cloudflare: TMDB's pictures where a title matches, and the site's own asked with its Referer.
  tmdbPictures: true,
  imageHeaders: { Referer: SITE + "/", "User-Agent": UA }
}));
async function screen(ctx) {
  await null;
  return standard().screen(ctx && typeof ctx === "object" ? ctx : {});
}
async function screenEvent(ev) {
  await null;
  return standard().screenEvent(ev && typeof ev === "object" ? ev : {});
}
var proto_catalog_search = catalogDoor(search);
export {
  TABS,
  browse,
  episodes,
  home,
  kindOf,
  listUrl,
  metaTitle,
  metaType,
  proto_catalog_search,
  resolve,
  screen,
  screenEvent,
  search,
  serverScores,
  serversOf
};
