// kino-plugin.json
var kino_plugin_default = {
  id: "todoanime",
  name: "TodoAnime",
  version: "0.4.0",
  apiVersion: 20,
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
        "resolve"
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
    settingsIn: "screen"
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

// src/browse/model.js
var MAX_SLIDES = 6;
var MAX_RAILS = 8;
var MAX_RAIL_ITEMS = 20;
var MAX_SLIDE_TEXT = 160;
var HTTPS2 = /^https:\/\//;
function cardOf(item) {
  const out = { id: item.id, ref: item.ref, title: item.title, kind: item.kind };
  if (item.poster && HTTPS2.test(item.poster)) out.poster = item.poster;
  if (item.backdrop && HTTPS2.test(item.backdrop)) out.backdrop = item.backdrop;
  if (item.year !== void 0) out.year = item.year;
  if (item.lang) out.lang = item.lang;
  return out;
}
function slidesOf(rows) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const row of rows) {
    for (const item of row.items) {
      if (out.length >= MAX_SLIDES) return out;
      const image = item.backdrop && HTTPS2.test(item.backdrop) ? item.backdrop : item.poster;
      if (seen.has(item.id) || !image || !HTTPS2.test(image)) continue;
      const text = typeof item.overview === "string" ? item.overview.trim() : "";
      if (text === "") continue;
      seen.add(item.id);
      out.push({ id: item.id, ref: item.ref, kind: item.kind, title: item.title, image, text: text.length <= MAX_SLIDE_TEXT ? text : `${text.slice(0, MAX_SLIDE_TEXT - 1).trimEnd()}\u2026` });
    }
  }
  return out;
}
function railsOf(rows) {
  return rows.filter((r) => r.items && r.items.length > 0).slice(0, MAX_RAILS).map((r) => ({
    id: r.id,
    title: r.title,
    ...r.titleEn ? { titleEn: r.titleEn } : {},
    ...r.ref ? { ref: r.ref } : {},
    items: r.items.slice(0, MAX_RAIL_ITEMS).map(cardOf)
  }));
}
function tabOf(page) {
  const rows = page && Array.isArray(page.rows) ? page.rows : [];
  const rails = railsOf(rows);
  if (rails.length === 0) return null;
  return { slides: slidesOf(rows), rails };
}
function recentOf(keys, tabs) {
  if (keys.length === 0) return [];
  const byRef = /* @__PURE__ */ new Map();
  for (const data of tabs) for (const rail2 of data.rails) for (const card of rail2.items) if (!byRef.has(card.ref)) byRef.set(card.ref, card);
  const out = [];
  const used = /* @__PURE__ */ new Set();
  for (const key of keys) {
    const card = byRef.get(key);
    if (card && !used.has(card.id)) {
      used.add(card.id);
      out.push(card);
    }
  }
  return out;
}

// src/i18n.js
var T = {
  brWatch: ["Ver ahora", "Watch now"],
  brInfo: ["M\xE1s informaci\xF3n", "More info"],
  brRecent: ["Continuar viendo", "Continue watching"],
  brEmpty: ["No hay t\xEDtulos para mostrar ahora.", "There is nothing to show right now."],
  brFailed: ["No se pudo cargar esta secci\xF3n. Revisa tu conexi\xF3n.", "This section could not be loaded. Check your connection."],
  brRetry: ["Reintentar", "Retry"],
  brClose: ["Cerrar", "Close"],
  brBack: ["Atr\xE1s", "Back"],
  brSearch: ["Buscar", "Search"],
  brSettings: ["Ajustes", "Settings"],
  brSearchHint: ["Escribe un t\xEDtulo", "Type a title"],
  brSearchTitle: ["Buscar", "Search"],
  brSearchFailed: ["La b\xFAsqueda no respondi\xF3. Intenta de nuevo.", "The search did not answer. Try again."],
  brNoResults: ["No encontramos nada con esas palabras.", "Nothing matched those words."],
  brSearchedBefore: ["Buscados antes", "Searched before"],
  needResolver: ["Instala el motor de reproducci\xF3n para ver esto. Es gratis y se hace una sola vez.", "Install the playback engine to watch this. It is free and done once."],
  noServer: ["Este episodio no tiene ahora un servidor que abra. Intenta de nuevo m\xE1s tarde.", "This episode has no server that opens right now. Try again later."],
  siteDown: ["El sitio no responde ahora. Intenta de nuevo en un rato.", "The site is not answering right now. Try again in a moment."]
};
function both(key, vars = {}) {
  const pair = T[key] || [key, key];
  const fill = (s) => s.replace(/\{(\w+)\}/g, (_, k) => k in vars ? String(vars[k]) : "");
  return { es: fill(pair[0]), en: fill(pair[1]) };
}
function t(kino2, key, vars) {
  const w = both(key, vars);
  return String(kino2 && kino2.lang || "").toLowerCase().startsWith("es") ? w.es : w.en;
}

// src/browse/view.js
var POLL_MS = 1500;
var IMAGE_HEADERS = { Referer: SITE + "/", "User-Agent": UA };
var SEARCH_CAP = 60;
var twin = (key, field = "text", vars) => {
  const w = both(key, vars);
  return { [field]: w.es, [field + "En"]: w.en };
};
var tabLabel = (tab) => ({ label: tab.es, labelEn: tab.en });
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
var gridSkeleton = () => ({
  type: "Column",
  key: "gridSkeleton",
  gap: 12,
  children: [
    ...[1, 2].map((r) => ({ type: "Row", gap: 12, sizes: ["compact"], key: `gc${r}`, children: [1, 2, 3].map((i) => ({ type: "Skeleton", shape: "card", key: `gc${r}-${i}`, flex: 1 })) })),
    ...[1, 2].map((r) => ({ type: "Row", gap: 12, sizes: ["medium", "expanded"], key: `gw${r}`, children: [1, 2, 3, 4, 5, 6].map((i) => ({ type: "Skeleton", shape: "card", key: `gw${r}-${i}`, flex: 1 })) }))
  ]
});
var heroSkeleton = () => ({ type: "Skeleton", key: "heroSkeleton", shape: "block", height: { compact: 200, expanded: 320 } });
var slideNode = (s, canPlay) => ({
  type: "heroCard",
  key: "slide-" + s.id,
  h: { compact: 200, expanded: 240 },
  ...s.logo ? { logo: s.logo } : {},
  title: s.title,
  text: s.text,
  image: s.image,
  headers: IMAGE_HEADERS,
  buttons: canPlay ? [
    { type: "ElevatedButton", key: "watch-" + s.id, ...twin("brWatch", "labelText"), icon: "play", onPressed: { go: { play: { ref: s.ref, kind: s.kind, id: s.id, title: s.title } } } },
    { type: "TextButton", key: "info-" + s.id, ...twin("brInfo", "labelText"), onPressed: { go: { title: { ref: s.ref, kind: s.kind, id: s.id, title: s.title } } } }
  ] : [
    { type: "ElevatedButton", key: "watch-" + s.id, ...twin("brWatch", "labelText"), icon: "play", onPressed: { go: { title: { ref: s.ref, kind: s.kind, id: s.id, title: s.title } } } }
  ]
});
var hero = (slides, canPlay) => slides.length === 1 ? slideNode(slides[0], canPlay) : { type: "PageView", key: "hero" + slides.length, autoPlayMs: 6e3, children: slides.map((x) => slideNode(x, canPlay)) };
var rail = (r, key, titleOverride) => ({
  type: "titleRail",
  key,
  ...titleOverride || { title: r.title, ...r.titleEn ? { titleEn: r.titleEn } : {} },
  ...r.ref ? { ref: r.ref } : {},
  items: r.items,
  size: "medium",
  headers: IMAGE_HEADERS
});
var brandNode = (brand) => ({ type: "Text", key: "logo", text: brand, textEn: brand, style: "h4" });
var tabBar = (tabs, active) => ({ type: "TabBar", key: "tabs", divider: false, value: active, onChanged: "tab", tabs: tabs.map((t2) => ({ value: t2.id, ...tabLabel(t2) })) });
function browseView({ brand, tabs, tab, data, recent, pending, failed, canPlay = false, device = "phone" }) {
  const tv = device === "tv";
  const active = tabs.some((t2) => t2.id === tab) ? tab : tabs[0].id;
  const body = [];
  if (data) {
    if (data.slides.length > 0) body.push(hero(data.slides, canPlay));
    if (recent.length > 0) body.push(rail({ items: recent }, "recent", twin("brRecent", "title")));
    for (const r of data.rails) body.push(rail(r, "rail-" + String(r.id).replace(/[^A-Za-z0-9_-]/g, "_")));
    if (data.rails.length === 0) body.push({ type: "Text", ...twin("brEmpty", "text"), color: "muted" });
  } else if (failed) {
    body.push({ type: "MaterialBanner", key: "loadFailed", role: "error", ...twin("brFailed"), action: { ...twin("brRetry", "label"), onTap: "retry" } });
  } else {
    body.push(heroSkeleton(), railSkeleton(1), railSkeleton(2), railSkeleton(3));
  }
  const gear = { type: "IconButton", key: "settingsButton", icon: "settings", ...twin("brSettings", "labelText"), ...twin("brSettings", "tooltip"), onPressed: { event: "go", arg: "settings" } };
  return {
    type: "Scaffold",
    appBar: {
      type: "AppBar",
      mergeWithKinoBar: true,
      dense: true,
      divider: false,
      leading: { type: "IconButton", key: "close", icon: "close", ...twin("brClose", "labelText"), ...twin("brClose", "tooltip"), onPressed: { go: { close: true } } },
      // On a TV the search is a button of the bar (a floating one is hard to reach with a remote); elsewhere it floats.
      actions: tv ? [{ type: "IconButton", key: "searchButton", icon: "search", ...twin("brSearch", "labelText"), ...twin("brSearch", "tooltip"), onPressed: "openSearch" }, gear] : [gear],
      // On a TV the tabs sit in the bar beside the name (one row, one D-pad strip); elsewhere they are pinned under it.
      title: tv ? { type: "Row", key: "titleRow", gap: 24, crossAxisAlignment: "center", children: [brandNode(brand), tabBar(tabs, active)] } : brandNode(brand)
    },
    ...tv ? {} : { floatingActionButton: { type: "FloatingActionButton", key: "searchFab", icon: "search", ...twin("brSearch", "tooltip"), onPressed: "openSearch" } },
    body: { type: "Column", key: "page", children: [
      ...tv ? [] : [{ type: "Column", key: "tabsRow", padding: { compact: 0, expanded: 24 }, children: [tabBar(tabs, active)] }],
      { type: "SingleChildScrollView", key: "browse-" + active, flex: 1, children: [{ type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: body }] }
    ] },
    ...pending ? { every: { ms: POLL_MS, event: "tick" } } : {}
  };
}
function searchView({ query, status, items, history = [], device = "phone" }) {
  const tv = device === "tv";
  const searchForm = () => ({
    type: "Form",
    key: "searchForm",
    onSubmitted: "search",
    gap: 8,
    children: tv ? [{ type: "Row", key: "searchRow", gap: 16, crossAxisAlignment: "center", children: [
      { type: "TextField", key: "q", kind: "text", value: query, ...twin("brSearchHint", "labelText"), maxLength: 100, autofocus: true, weight: 1 },
      { type: "ElevatedButton", key: "searchGo", ...twin("brSearch", "labelText"), icon: "search", submit: true }
    ] }] : [
      { type: "TextField", key: "q", kind: "text", value: query, ...twin("brSearchHint", "labelText"), maxLength: 100, autofocus: true },
      { type: "ElevatedButton", key: "searchGo", ...twin("brSearch", "labelText"), icon: "search", submit: true }
    ]
  });
  const body = tv ? [] : [searchForm()];
  if (status === "fail") {
    body.push({ type: "MaterialBanner", key: "searchFailed", role: "error", ...twin("brSearchFailed"), action: { ...twin("brRetry", "label"), onTap: "sretry" } });
  } else if (status === "done" && items) {
    if (items.length === 0) body.push({ type: "Text", ...twin("brNoResults", "text"), color: "muted" });
    else body.push({ type: "titleGrid", key: "results", columns: { compact: 3, expanded: 6 }, items: items.slice(0, SEARCH_CAP), headers: IMAGE_HEADERS });
  } else if (status !== "idle") {
    body.push(gridSkeleton());
  } else if (history.length > 0) {
    body.push({ type: "Text", ...twin("brSearchedBefore", "text"), style: "h4" });
    body.push({ type: "titleGrid", key: "history", columns: { compact: 3, expanded: 6 }, items: history.slice(0, SEARCH_CAP), headers: IMAGE_HEADERS });
  }
  return {
    type: "Scaffold",
    appBar: {
      type: "AppBar",
      mergeWithKinoBar: true,
      dense: true,
      divider: false,
      leading: { type: "IconButton", key: "back", icon: "arrow_back", ...twin("brBack", "labelText"), ...twin("brBack", "tooltip"), onPressed: "back" },
      ...tv ? { title: searchForm() } : twin("brSearchTitle", "title")
    },
    body: { type: "SingleChildScrollView", key: "search-page", children: [{ type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: body }] },
    ...status === "loading" ? { every: { ms: 1e3, event: "stick" } } : {}
  };
}
function settingsView({ brand }) {
  return {
    type: "Scaffold",
    appBar: {
      type: "AppBar",
      mergeWithKinoBar: true,
      dense: true,
      divider: false,
      leading: { type: "IconButton", key: "back", icon: "arrow_back", ...twin("brBack", "labelText"), ...twin("brBack", "tooltip"), onPressed: "back" },
      title: brandNode(brand)
    },
    body: { type: "SingleChildScrollView", key: "settings-page", children: [{ type: "Column", padding: { compact: 12, expanded: 24 }, gap: 16, children: [{ type: "settings", key: "form" }] }] }
  };
}

// src/browse/metaCache.js
var KEY = "meta2";
var MAX = 120;
var CALL_MS = 8e3;
var HTTPS3 = /^https:\/\//;
function makeMetaCache({ kino: kino2, titleOf = (c) => c.title, typeOf = (c) => c.kind === "series" ? "series" : "movie", clock = { now: () => Date.now() } }) {
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
      ...e.b && HTTPS3.test(e.b) ? { backdrop: e.b } : {}
    };
  }
  function dress(cards) {
    return cards.map((c) => {
      const k = known(c.id);
      if (!k.tmdb && !k.poster) return c;
      return { ...c, ...k.tmdb && !(c.ids && c.ids.tmdb) ? { ids: { ...c.ids || {}, tmdb: k.tmdb } } : {}, ...k.poster ? { poster: k.poster } : {} };
    });
  }
  async function fill(cards, budgetMs) {
    if (!usable()) return 0;
    const b = read();
    const end = clock.now() + budgetMs;
    let asked = 0;
    for (const c of cards) {
      if (clock.now() + CALL_MS > end) break;
      if (!c || typeof c.id !== "string" || Object.hasOwn(b, c.id) || c.ids && c.ids.tmdb && c.noLogo) continue;
      const year = c.year !== void 0 ? { year: c.year } : {};
      try {
        const a = await kino2.meta({ type: typeOf(c), title: titleOf(c), ...year });
        b[c.id] = {
          t: a && a.ids && Number.isInteger(a.ids.tmdb) ? a.ids.tmdb : 0,
          l: a && typeof a.logo === "string" ? a.logo : "",
          p: a && typeof a.poster === "string" ? a.poster : "",
          b: a && typeof a.backdrop === "string" ? a.backdrop : ""
        };
      } catch (e) {
        if (e && e.code === "rate_limited") break;
        continue;
      }
      asked++;
    }
    if (asked > 0) write();
    return asked;
  }
  return { known, dress, fill, usable };
}

// src/browse/index.js
var SNAP_TTL_MS = 12 * 3600 * 1e3;
var SNAP_MAX = 20 * 1024;
var RECENT_MAX = 12;
var HIST_MAX = 24;
function makeBrowse({ kino: kino2, brand, tabs, loadTab: loadTab2, searchTitles, canPlay = false, titleOf, typeOf }) {
  const TAB_IDS = tabs.map((t2) => t2.id);
  const TAB_KEY = "browseTab";
  const SNAP_PREFIX = "browse1:";
  const RECENT_KEY = "recent1";
  const HIST_KEY = "searchHist1";
  const meta = makeMetaCache({ kino: kino2, titleOf, typeOf });
  const enrich = (data) => data ? {
    slides: data.slides.map((s) => {
      const k = meta.known(s.id);
      return k.logo || k.backdrop ? { ...s, ...k.logo ? { logo: k.logo } : {}, ...k.backdrop ? { image: k.backdrop } : {} } : s;
    }),
    rails: data.rails.map((r) => ({ ...r, items: meta.dress(r.items) }))
  } : data;
  const memo = /* @__PURE__ */ new Map();
  const log = (...a) => {
    try {
      kino2.log("[" + brand + "]", ...a);
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
  function writeSnap(tab, data) {
    for (let per = 10; per >= 3; per -= 2) {
      const slim2 = { slides: data.slides, rails: data.rails.map((r) => ({ ...r, items: r.items.slice(0, per) })) };
      const text = JSON.stringify({ at: Date.now(), data: slim2 });
      if (text.length <= SNAP_MAX) {
        set(SNAP_PREFIX + tab, text, { ttlMs: SNAP_TTL_MS });
        return;
      }
    }
  }
  const stored = () => {
    const t2 = get(TAB_KEY);
    return TAB_IDS.includes(t2) ? t2 : null;
  };
  const remember = (tab) => set(TAB_KEY, tab);
  function dataOf(tab) {
    if (memo.has(tab)) return memo.get(tab).data;
    const snap = readSnap(tab);
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
      const key = String(ref || "");
      if (key === "") return;
      const keys = readKeys();
      if (keys[0] === key) return;
      set(RECENT_KEY, JSON.stringify([key, ...keys.filter((k) => k !== key)].slice(0, RECENT_MAX)));
    } catch (_) {
    }
  }
  const slim = (c) => ({ id: c.id, ref: c.ref, title: c.title, kind: c.kind, ...c.poster ? { poster: c.poster } : {} });
  function readHistory() {
    try {
      const a = JSON.parse(get(HIST_KEY) || "[]");
      return Array.isArray(a) ? a.filter((c) => c && typeof c.id === "string" && typeof c.ref === "string" && typeof c.title === "string").slice(0, HIST_MAX) : [];
    } catch (_) {
      return [];
    }
  }
  function rememberFound(cards) {
    try {
      const fresh = cards.slice(0, 12).map(slim);
      const ids = new Set(fresh.map((c) => c.id));
      set(HIST_KEY, JSON.stringify([...fresh, ...readHistory().filter((c) => !ids.has(c.id))].slice(0, HIST_MAX)));
    } catch (_) {
    }
  }
  let found = null;
  const tabFromArgs = (route) => {
    const a = route && route.args && typeof route.args === "object" ? route.args : {};
    return TAB_IDS.includes(a.tab) ? a.tab : null;
  };
  function needed(tab, device) {
    const order = [tab, ...TAB_IDS.filter((t2) => t2 !== tab)];
    return order.filter((t2, i) => (i === 0 || device !== "tv") && !(memo.get(t2) && memo.get(t2).whole));
  }
  function view(ctx) {
    const st = ctx.state && typeof ctx.state === "object" ? ctx.state : {};
    if (ctx.route && ctx.route.name === "settings") return settingsView({ brand });
    if (ctx.route && ctx.route.name === "search") {
      const query = typeof st.sq === "string" ? st.sq : "";
      const items = found && found.q === query ? found.items : null;
      const status = query === "" ? "idle" : st.sstate === "fail" ? "fail" : items ? "done" : "loading";
      return searchView({ query, status, items, history: query === "" ? readHistory() : [], device: ctx.device });
    }
    const tab = TAB_IDS.includes(st.tab) ? st.tab : tabFromArgs(ctx.route) ?? stored() ?? TAB_IDS[0];
    const data = enrich(dataOf(tab));
    const loaded = TAB_IDS.map((t2) => memo.get(t2)).filter(Boolean).map((m) => m.data);
    const pending = Array.isArray(st.pending) && st.pending.length > 0;
    return browseView({ brand, tabs, tab, data, recent: meta.dress(recentOf(readKeys(), loaded)), pending, failed: !!(st.failed && st.failed[tab]), canPlay, device: ctx.device });
  }
  async function load(tab) {
    const page = await loadTab2(tab);
    const data = tabOf(page);
    if (data) {
      memo.set(tab, { data, whole: true });
      writeSnap(tab, data);
    }
    return data !== null;
  }
  const events = {
    open({ route, state, device }) {
      const tab = tabFromArgs(route) ?? (TAB_IDS.includes(state.tab) ? state.tab : stored() ?? TAB_IDS[0]);
      for (const t2 of TAB_IDS) dataOf(t2);
      return { state: { tab, pending: needed(tab, device), failed: null } };
    },
    tab({ value, arg, state }) {
      const tab = TAB_IDS.includes(value) ? value : TAB_IDS.includes(arg) ? arg : null;
      if (!tab) return null;
      remember(tab);
      dataOf(tab);
      const failed = { ...state.failed || {} };
      delete failed[tab];
      const pending = [tab, ...Array.isArray(state.pending) ? state.pending.filter((t2) => t2 !== tab) : []];
      return { state: { tab, pending: memo.get(tab) && memo.get(tab).whole ? pending.slice(1) : pending, failed } };
    },
    retry({ state, device }) {
      const tab = TAB_IDS.includes(state.tab) ? state.tab : TAB_IDS[0];
      return { state: { failed: null, pending: [tab, ...needed(tab, device).filter((t2) => t2 !== tab)] } };
    },
    async tick({ state }) {
      const pending = Array.isArray(state.pending) ? state.pending : [];
      if (pending.length === 0) return null;
      const [next, ...rest] = pending;
      const failed = { ...state.failed || {} };
      if (next.startsWith("meta:")) {
        const m = memo.get(next.slice(5));
        if (m) await meta.fill([...m.data.slides.map((s) => ({ id: s.id, title: s.title, kind: s.kind })), ...m.data.rails.flatMap((r) => r.items.slice(0, 6).map((c) => ({ id: c.id, title: c.title, kind: c.kind })))], 12e3);
        return { state: { pending: rest } };
      }
      try {
        const ok = await load(next);
        if (!ok) failed[next] = true;
        else delete failed[next];
        if (ok && meta.usable()) rest.unshift("meta:" + next);
      } catch (e) {
        log("browse tab", e && e.code || "error");
        failed[next] = true;
      }
      return { state: { pending: rest, failed } };
    },
    // The floating button: straight to the search page, empty and ready for the words.
    openSearch() {
      return { route: { push: "search" }, state: { sq: "", sstate: null } };
    },
    search({ value, route }) {
      const q = value && typeof value.q === "string" ? value.q.trim().slice(0, 100) : "";
      if (q === "") return null;
      const state = { sq: q, sstate: "loading" };
      return route && route.name === "search" ? { state } : { route: { push: "search" }, state };
    },
    // The search page's timer: one search per press, then no timer.
    async stick({ state }) {
      const q = typeof state.sq === "string" ? state.sq : "";
      if (q === "" || state.sstate !== "loading") return null;
      try {
        const out = await searchTitles(q);
        found = { q, items: (Array.isArray(out) ? out : []).slice(0, 60).map(cardOf) };
        rememberFound(found.items);
        return { state: { sstate: "done" } };
      } catch (e) {
        log("browse search", e && e.code || "error");
        return { state: { sstate: "fail" } };
      }
    },
    sretry({ state }) {
      return typeof state.sq === "string" && state.sq !== "" ? { state: { sstate: "loading" } } : null;
    },
    // The gear: the plugin's settings are a page of their own, one Back away.
    go({ arg }) {
      return arg === "settings" ? { route: { push: "settings" }, state: { fromBrowse: true } } : null;
    },
    back({ state, route }) {
      if (route && route.name === "settings" && !state.fromBrowse) return { close: true };
      return { route: { pop: true }, state: { sq: null, sstate: null } };
    }
  };
  async function event(ev) {
    const handler = Object.hasOwn(events, ev.name) ? events[ev.name] : null;
    return handler ? await handler({ ...ev, state: ev.state || {} }) ?? null : null;
  }
  return { view, event, notePlayed };
}

// src/plugin.js
globalThis.__kinoDropPendingFetches = true;
var BRAND = "TodoAnime";
var MAX_COPIES = 8;
var TRY_AT_ONCE = 3;
var CALL_MS2 = 16e3;
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
  return out.map(({ titleEn, ...row }) => row);
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
function serversOf(html, preferred = "", score = null) {
  const list = parsePlayers(html).map((p, n) => ({ ...p, n, kind: kindOf(p.link) }));
  const pref = (k) => preferred && k === preferred ? 0 : 1;
  const tier = (k) => NEEDS_BROWSER.has(k) || !PREFER.includes(k) ? 1 : 0;
  const learned = (k) => score ? -score(k) : 0;
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
var RESOLVER_REPO = "xuper-plugin/kino-plugin-kino-resolver";
var SUPPORT_URL = "https://ko-fi.com/xuperplugins";
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
function supportNode(device) {
  if (device === "tv") return { type: "QrImage", value: SUPPORT_URL, size: "large", labelText: "Si te gusta mi trabajo, escan\xE9alo y ap\xF3yame", labelTextEn: "If you like my work, scan it and support me" };
  return { type: "ElevatedButton", key: "donate", icon: "heart", labelText: "Si te gusta mi trabajo, ap\xF3yame", labelTextEn: "If you like my work, support me", onPressed: { go: { url: { href: SUPPORT_URL } } } };
}
function installGateView(device) {
  return {
    type: "Scaffold",
    key: "todoanime-install",
    body: { type: "SingleChildScrollView", key: "installScroll", children: [
      { type: "Column", padding: 24, gap: 16, crossAxisAlignment: "stretch", children: [
        { type: "Text", text: "Necesitas el motor de reproducci\xF3n", textEn: "You need the playback engine", style: "h3" },
        { type: "Text", color: "secondary", text: "TodoAnime reproduce a trav\xE9s de Kino Resolver (gratis). Inst\xE1lalo una vez y sirve para este y para otros plugins de sitios.", textEn: "TodoAnime plays through Kino Resolver (free). Install it once and it works here and in other site plugins." },
        { type: "ElevatedButton", key: "installResolver", labelText: "Instalar Kino Resolver", labelTextEn: "Install Kino Resolver", onPressed: { go: { installPlugin: { repo: RESOLVER_REPO } } } },
        supportNode(device)
      ] }
    ] }
  };
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
    return !!(e && (e.code === "host_not_allowed" || e.code === "too_large"));
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
  const servers = serversOf(await pageText(SITE + "/ver/" + slug), preferred === "auto" ? "" : preferred, serverScores());
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const deadline = Date.now() + CALL_MS2;
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
    browseScreen().notePlayed(seriesOfEpisode(slug));
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
var browseInstance = null;
var browseScreen = () => browseInstance ?? (browseInstance = makeBrowse({
  kino,
  brand: BRAND,
  tabs: TABS.map(({ id, es, en }) => ({ id, es, en })),
  loadTab,
  searchTitles: (q) => search({ q }),
  titleOf: (c) => metaTitle(c.title),
  typeOf: (c) => metaType(c.title)
}));
async function screen(ctx) {
  await null;
  const c = ctx && typeof ctx === "object" ? ctx : {};
  if (!(c.installed && c.installed[RESOLVER_REPO])) return installGateView(c.device);
  return browseScreen().view(c);
}
async function screenEvent(ev) {
  await null;
  return browseScreen().event(ev && typeof ev === "object" ? ev : {});
}
export {
  TABS,
  browse,
  episodes,
  home,
  kindOf,
  listUrl,
  metaTitle,
  metaType,
  resolve,
  screen,
  screenEvent,
  search,
  serverScores,
  serversOf
};
