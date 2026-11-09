var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/extractors/goodstream.js
var goodstream_exports = {};
__export(goodstream_exports, {
  HOSTS: () => HOSTS,
  extract: () => extract
});

// src/util/unpack.js
var ALPHA = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var toNum = (s, radix) => [...s].reduce((n, ch) => n * radix + ALPHA.indexOf(ch), 0);
function unpack(source) {
  const m = /}\s*\(\s*'((?:\\'|[^'])*)'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'((?:\\'|[^'])*)'\.split\('\|'\)/.exec(source || "");
  if (!m) return null;
  const payload = m[1].replace(/\\'/g, "'");
  const radix = Number(m[2]);
  const keys = m[4].split("|");
  if (radix < 2 || radix > 62) return null;
  return payload.replace(/\b[0-9a-zA-Z]+\b/g, (w) => {
    const i = toNum(w, radix);
    return Number.isInteger(i) && i >= 0 && keys[i] ? keys[i] : w;
  });
}

// src/extractors/shared.js
var HLS_MIME = "application/vnd.apple.mpegurl";
function fileM3u8(text, base) {
  const m = /\bfile\s*:\s*["']([^"']+\.m3u8[^"']*)["']/.exec(text || "");
  return m ? absolute(m[1], base) : null;
}
function hlsKey(text, keys, base) {
  for (const k of keys) {
    const m = new RegExp(`["']${k}["']\\s*:\\s*["']([^"']+)["']`).exec(text || "");
    if (m) return absolute(m[1].replace(/\\\//g, "/"), base);
  }
  return null;
}
function absolute(href, base) {
  try {
    return new URL(href, base).href;
  } catch (_) {
    return null;
  }
}
function findIn(html, pick) {
  return pick(html) || pick(unpack(html) || "") || null;
}
function miss(kino2, server, reason) {
  if (kino2 && typeof kino2.log === "function") kino2.log("[latino]", server, reason);
  return null;
}
async function pageText(req, url, headers, kino2, server) {
  const r = await req(url, { headers });
  return r.ok ? r.text() : miss(kino2, server || "embed", "status " + r.status);
}
var LANG_CODES = [
  [/^(español|espanol|spanish|castellano|latino|spa|esp?)\b/i, "es"],
  [/^(english|inglés|ingles|eng?)\b/i, "en"],
  [/^(portugu[eê]s|portuguese|pt)\b/i, "pt"],
  // never a bare "por": "Por defecto" is not Portuguese
  [/^(fran[cç]ais|french|franc[eé]s|fre|fra|fr)\b/i, "fr"],
  [/^(italiano|italian|ita|it)\b/i, "it"],
  [/^(deutsch|german|alem[aá]n|ger|deu|de)\b/i, "de"]
];
function langCode(label) {
  const s = String(label || "").trim();
  for (const [re, code] of LANG_CODES) if (re.test(s)) return code;
  return null;
}
function captionTracks(text, base) {
  const m = /["']?\btracks["']?\s*:\s*\[([\s\S]*?)\]/.exec(text || "");
  if (!m) return [];
  const out = [];
  for (const [obj] of m[1].matchAll(/\{[^{}]*\}/g)) {
    const field = (k) => (new RegExp(`["']?${k}["']?\\s*:\\s*["']([^"']*)["']`).exec(obj) || [])[1] || "";
    const kind = field("kind").toLowerCase();
    if (kind && kind !== "captions" && kind !== "subtitles") continue;
    const file = field("file");
    const format = (/\.(vtt|srt)(?:[?#]|$)/i.exec(file) || [])[1];
    const label = field("label");
    const lang = langCode(label);
    const url = format && lang ? absolute(file, base) : null;
    if (!url || out.some((t2) => t2.url === url)) continue;
    out.push({ lang, url, label, format: format.toLowerCase() });
  }
  return out;
}
function durationMsOf(text) {
  const re = /(?<![-\w])duration["']?\s*:\s*["']?(\d+(?:\.\d+)?)(?![\d.])(?!\s*m?s\b)/g;
  for (const m of String(text || "").matchAll(re)) {
    const ms = Math.round(Number(m[1]) * 1e3);
    if (ms >= 6e4) return ms;
  }
  return null;
}
function pageExtras(html, base) {
  const unpacked = unpack(html) || "";
  const subs = captionTracks(html, base);
  const subtitles = subs.length ? subs : captionTracks(unpacked, base);
  const durationMs = durationMsOf(html) || durationMsOf(unpacked);
  return { ...subtitles.length ? { subtitles } : {}, ...durationMs ? { durationMs } : {} };
}
var canCapture = (kino2) => !!(kino2 && kino2.browser && typeof kino2.browser.capture === "function");
var CAPTURE_MS = 12e3;
var MIN_CAPTURE_MS = 3e3;
async function captureMedia(embedUrl, req, kino2, server) {
  if (!canCapture(kino2)) return miss(kino2, server, "challenge page and no browser");
  const ms = Math.min(CAPTURE_MS, (req.left ? req.left() : CAPTURE_MS) - 300);
  if (ms < MIN_CAPTURE_MS) return miss(kino2, server, "no time to capture");
  let cap;
  try {
    cap = await kino2.browser.capture(embedUrl, { match: ".m3u8|.mp4", timeoutMs: ms });
  } catch (e) {
    return miss(kino2, server, "capture " + (e && e.code || "error"));
  }
  const m = cap && Array.isArray(cap.media) ? cap.media.find((x) => x && typeof x.url === "string" && /^https?:\/\//i.test(x.url)) : null;
  if (!m) return miss(kino2, server, "capture saw no media");
  return { url: m.url, mime: m.mime || (/\.mp4(?:[?#]|$)/i.test(m.url) ? "video/mp4" : HLS_MIME), headers: { Referer: embedUrl, ...m.headers || {} } };
}

// src/extractors/goodstream.js
var HOSTS = ["goodstream.one"];
async function extract(embedUrl, req, kino2) {
  const html = await pageText(req, embedUrl, { Referer: "https://goodstream.one/" }, kino2, "goodstream");
  if (html == null) return null;
  const url = findIn(html, (t2) => fileM3u8(t2, embedUrl));
  if (!url) return miss(kino2, "goodstream", "no playlist in page");
  return { url, mime: HLS_MIME, headers: { Referer: embedUrl, Origin: "https://goodstream.one" }, ...pageExtras(html, embedUrl) };
}

// src/extractors/vimeos.js
var vimeos_exports = {};
__export(vimeos_exports, {
  HOSTS: () => HOSTS2,
  extract: () => extract2
});
var HOSTS2 = ["vimeos.net", "vimeos.zip"];
async function extract2(embedUrl, req, kino2) {
  const html = await pageText(req, embedUrl, { Referer: "https://vimeos.net/" }, kino2, "vimeos");
  if (html == null) return null;
  const url = findIn(html, (t2) => fileM3u8(t2, embedUrl));
  if (!url) return miss(kino2, "vimeos", "no playlist in page");
  return { url, mime: HLS_MIME, headers: { Referer: "https://vimeos.net/" }, ...pageExtras(html, embedUrl) };
}

// src/extractors/streamwish.js
var streamwish_exports = {};
__export(streamwish_exports, {
  HOSTS: () => HOSTS3,
  extract: () => extract3
});

// kino-plugin.json
var kino_plugin_default = {
  id: "latanime",
  name: "LatAnime",
  version: "0.2.4",
  apiVersion: 9,
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
    "resolve"
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
  enhancements: {
    "14": {
      capabilities: [
        "screen"
      ],
      screen: {
        label: "LatAnime",
        labelEn: "LatAnime",
        icon: "movie",
        menuOpens: "screen",
        opensFrom: [
          "menu",
          "settings"
        ],
        settingsButton: {
          label: "Abrir LatAnime",
          labelEn: "Open LatAnime"
        },
        settingsIn: "screen"
      }
    },
    "19": {
      capabilities: [
        "screen"
      ]
    }
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
  ]
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
function urlDeclared(url) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch (_) {
    return false;
  }
  return hostDeclared(host);
}

// src/util/http.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
var RETRY_STATUS = /* @__PURE__ */ new Set([408, 425, 429, 500, 502, 503, 504, 520, 521, 522, 524]);
var SLOW_ATTEMPT_MS = 3e3;
var fetchAllowed = (kino2, url) => kino2 && kino2.fetchAnyHost === true || urlDeclared(url);
var requestPool = (n) => ({ left: n });
function makeRequester(kino2, { budget = 12, deadline = Date.now() + 8e3, pools = [], concurrency = Infinity, maxMs = 8e3 } = {}) {
  let used = 0;
  let active = 0;
  const waiting = [];
  const acquire = () => active < concurrency ? (active++, Promise.resolve()) : new Promise((r) => waiting.push(r));
  const release = () => {
    const next = waiting.shift();
    if (next) next();
    else active--;
  };
  function makeLocalError(code, message) {
    const e = kino2.error(code, message);
    e.local = true;
    return e;
  }
  async function once(url, opts, timing = {}) {
    if (!fetchAllowed(kino2, url)) throw makeLocalError("host_not_allowed", "host not declared: " + hostOf(url));
    await acquire();
    try {
      if (used >= budget) throw makeLocalError("unavailable", "budget spent at " + url);
      if (pools.some((p) => p.left <= 0)) throw makeLocalError("unavailable", "call allowance spent at " + url);
      const left = deadline - Date.now();
      if (left <= 0) throw makeLocalError("unavailable", "deadline before " + url);
      used++;
      for (const p of pools) p.left--;
      const headers = { "User-Agent": UA, ...opts.headers || {} };
      const { retry, ...rest } = opts;
      const sentAt = Date.now();
      try {
        return await kino2.fetch(url, { ...rest, headers, timeoutMs: Math.min(maxMs, left) });
      } finally {
        timing.spentMs = Date.now() - sentAt;
      }
    } finally {
      release();
    }
  }
  let degraded = false;
  const roomToRetry = () => used < budget && !pools.some((p) => p.left <= 0) && deadline - Date.now() > 600;
  async function send(url, opts = {}) {
    const timing = {};
    try {
      const r = await once(url, opts, timing);
      if (opts.retry === false || !RETRY_STATUS.has(r.status)) return r;
      if (roomToRetry() && timing.spentMs < SLOW_ATTEMPT_MS) {
        await kino2.sleep(600);
        return once(url, opts);
      }
      return r;
    } catch (e) {
      if (opts.retry === false || e && (e.local || e.code === "host_not_allowed")) throw e;
      if (roomToRetry() && !(timing.spentMs >= SLOW_ATTEMPT_MS)) {
        await kino2.sleep(600);
        return once(url, opts);
      }
      throw e;
    }
  }
  async function req(url, opts = {}) {
    const r = await send(url, opts);
    if (r && (r.status === 429 || r.status >= 500)) degraded = true;
    return r;
  }
  req.degraded = () => degraded;
  req.used = () => used;
  req.exhausted = () => used >= budget || deadline - Date.now() <= 0 || pools.some((p) => p.left <= 0);
  req.left = () => Math.max(0, deadline - Date.now());
  return req;
}
var hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch (_) {
    return String(url).slice(0, 80);
  }
};

// src/extractors/streamwish.js
var HOSTS3 = ["hlswish.com", "streamwish.com", "streamwish.to", "strwish.com", "wishembed.com", "filelions.com", "hglink.to", "vibuxer.com"];
async function extract3(embedUrl, req, kino2) {
  const u = new URL(embedUrl);
  if (u.hostname === "hglink.to") u.hostname = "vibuxer.com";
  const referer = u.origin + "/";
  const html = await pageText(req, u.href, { Referer: referer }, kino2, "streamwish");
  if (html == null) return null;
  const url = findIn(html, (t2) => hlsKey(t2, ["hls4", "hls2", "hls3"], u.origin) || fileM3u8(t2, u.origin));
  if (!url) return miss(kino2, "streamwish", "no playlist in page");
  return { url, mime: HLS_MIME, headers: { "User-Agent": UA, Referer: referer }, ...pageExtras(html, u.origin) };
}

// src/extractors/vidhide.js
var vidhide_exports = {};
__export(vidhide_exports, {
  HOSTS: () => HOSTS4,
  extract: () => extract4
});
var HOSTS4 = ["vidhide.com", "vidhidepro.com", "vidhideplus.com", "vidhidefast.com", "dintezuvio.com", "minochinos.com", "filelions.to", "morencius.com"];
async function extract4(embedUrl, req, kino2) {
  const u = new URL(embedUrl);
  const html = await pageText(req, embedUrl, { Referer: u.origin + "/" }, kino2, "vidhide");
  if (html == null) return null;
  const url = findIn(html, (t2) => hlsKey(t2, ["hls4", "hls2"], u.origin) || fileM3u8(t2, u.origin));
  if (!url) return miss(kino2, "vidhide", "no playlist in page");
  return { url, mime: HLS_MIME, headers: { Referer: u.origin + "/", Origin: u.origin }, ...pageExtras(html, u.origin) };
}

// src/extractors/fastream.js
var fastream_exports = {};
__export(fastream_exports, {
  HOSTS: () => HOSTS5,
  extract: () => extract5
});
var HOSTS5 = ["fastream.to"];
async function extract5(embedUrl, req, kino2) {
  const html = await pageText(req, embedUrl, { Referer: "https://fastream.to/" }, kino2, "fastream");
  if (html == null) return null;
  const url = findIn(html, (t2) => fileM3u8(t2, embedUrl));
  if (!url) return miss(kino2, "fastream", "no playlist in page");
  return { url, mime: HLS_MIME, headers: { Referer: "https://fastream.to/" }, ...pageExtras(html, embedUrl) };
}

// src/extractors/voe.js
var voe_exports = {};
__export(voe_exports, {
  HOSTS: () => HOSTS6,
  canCapture: () => canCapture2,
  decodeVoe: () => decodeVoe,
  extract: () => extract6
});
var HOSTS6 = ["voe.sx"];
var JUNK = ["@$", "^^", "~@", "%?", "*~", "!!", "#&"];
var rot13 = (s) => s.replace(/[a-z]/gi, (c) => {
  const b = c <= "Z" ? 65 : 97;
  return String.fromCharCode((c.charCodeAt(0) - b + 13) % 26 + b);
});
function decodeVoe(enc) {
  let s = rot13(enc);
  for (const j of JUNK) s = s.split(j).join("");
  s = atob(s);
  s = [...s].map((c) => String.fromCharCode(c.charCodeAt(0) - 3)).join("");
  s = [...s].reverse().join("");
  return JSON.parse(decodeURIComponent(escape(atob(s))));
}
var redirectOf = (html) => (/window\.location\.href\s*=\s*'([^']+)'/.exec(html) || [])[1] || null;
var canCapture2 = (kino2) => !!(kino2 && kino2.browser && kino2.browser.captureAll === true && typeof kino2.browser.capture === "function");
var CAPTURE_MS2 = 12e3;
var MIN_CAPTURE_MS2 = 3e3;
async function capture(embedUrl, req, kino2) {
  const ms = Math.min(CAPTURE_MS2, (req.left ? req.left() : CAPTURE_MS2) - 300);
  if (ms < MIN_CAPTURE_MS2) {
    kino2.log("[latino]", "voe", "no time to capture");
    return null;
  }
  let cap;
  try {
    cap = await kino2.browser.capture(embedUrl, { match: "\\.m3u8|\\.mp4", timeoutMs: ms });
  } catch (e) {
    kino2.log("[latino]", "voe capture", e && e.code || "error");
    return null;
  }
  const m = cap && Array.isArray(cap.media) ? cap.media.find((x) => x && typeof x.url === "string" && /^https?:\/\//i.test(x.url)) : null;
  if (!m) {
    kino2.log("[latino]", "voe capture", "no media");
    return null;
  }
  const mime = m.mime || (/\.mp4(?:[?#]|$)/i.test(m.url) ? "video/mp4" : HLS_MIME);
  return { url: m.url, mime, headers: { Referer: embedUrl, ...m.headers || {} } };
}
async function extract6(embedUrl, req, kino2) {
  const log = (...a) => {
    if (kino2) kino2.log("[latino]", "voe", ...a);
  };
  const first = await req(embedUrl, { headers: { Referer: embedUrl } });
  if (!first.ok) {
    log("embed", first.status);
    return null;
  }
  let html = first.text();
  const next = redirectOf(html);
  if (next) {
    if (!fetchAllowed(kino2, next)) {
      if (canCapture2(kino2)) return capture(embedUrl, req, kino2);
      log("rotating host, no browser");
      return null;
    }
    try {
      const r = await req(next, { headers: { Referer: embedUrl } });
      if (!r.ok) {
        log("player", r.status);
        return null;
      }
      html = r.text();
    } catch (e) {
      if (!(e && e.code === "host_not_allowed")) throw e;
      if (canCapture2(kino2)) return capture(embedUrl, req, kino2);
      log("host_not_allowed");
      return null;
    }
  }
  const j = /<script type="application\/json">\s*\["([^"]+)"\]/.exec(html);
  if (j) {
    try {
      const d = decodeVoe(j[1]);
      const url = d.source || d.direct_access_url;
      if (url) return { url, mime: /\.mp4/.test(url) ? "video/mp4" : HLS_MIME, headers: { Referer: embedUrl } };
    } catch (_) {
    }
  }
  const h = /'hls'\s*:\s*'([^']+)'/.exec(html) || /(https?:\/\/[^"'\s]+\.mp4[^"'\s]*)/.exec(html);
  if (!h) {
    log("no stream in page");
    return null;
  }
  return { url: h[1], headers: { Referer: embedUrl } };
}

// src/extractors/okru.js
var okru_exports = {};
__export(okru_exports, {
  HOSTS: () => HOSTS7,
  extract: () => extract7,
  playerMetadata: () => playerMetadata,
  renditions: () => renditions,
  unescapeAttr: () => unescapeAttr
});
var HOSTS7 = ["ok.ru"];
var HEIGHT_OF = { mobile: 144, lowest: 240, low: 360, sd: 480, hd: 720, full: 1080, quad: 1440, ultra: 2160 };
var HEADERS = { Referer: "https://ok.ru/" };
var ENTITIES = { quot: '"', amp: "&", apos: "'", lt: "<", gt: ">" };
function unescapeAttr(value) {
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, code) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCharCode(n) : all;
    }
    return ENTITIES[code.toLowerCase()] ?? all;
  });
}
var parse = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
};
function playerMetadata(html) {
  const attr = /\bdata-options\s*=\s*"([^"]*)"/.exec(html || "");
  if (!attr) return null;
  const options = parse(unescapeAttr(attr[1]));
  const meta = options && options.flashvars && options.flashvars.metadata;
  if (typeof meta === "string") return parse(meta);
  return meta && typeof meta === "object" ? meta : null;
}
var order = (h) => h == null ? 99999 : h <= 1080 ? 1080 - h : 1e3 + h;
function renditions(meta) {
  const list = meta && Array.isArray(meta.videos) ? meta.videos : [];
  return list.filter((v) => v && typeof v.url === "string" && /^https?:\/\//i.test(v.url) && !v.disallowed).map((v) => {
    const name = String(v.name || "").toLowerCase();
    return { name, height: HEIGHT_OF[name] ?? null, url: v.url };
  }).filter((v) => v.height !== HEIGHT_OF.mobile).sort((a, b) => order(a.height) - order(b.height));
}
async function extract7(embedUrl, req, kino2) {
  const r = await req(embedUrl, { headers: { Accept: "text/html", ...HEADERS } });
  if (!r.ok) return miss(kino2, "okru", "status " + r.status);
  const meta = playerMetadata(r.text());
  if (!meta) return miss(kino2, "okru", "no player settings (removed or restricted video)");
  const [best] = renditions(meta);
  if (best) return { url: best.url, mime: "video/mp4", headers: HEADERS, ...best.height ? { quality: best.height + "p" } : {} };
  const hls = typeof meta.hlsManifestUrl === "string" && /^https?:\/\//i.test(meta.hlsManifestUrl) ? meta.hlsManifestUrl : null;
  return hls ? { url: hls, mime: HLS_MIME, headers: HEADERS } : miss(kino2, "okru", "no renditions");
}

// src/extractors/nupload.js
var nupload_exports = {};
__export(nupload_exports, {
  HOSTS: () => HOSTS8,
  extract: () => extract8
});
var HOSTS8 = ["nupload.me", "nupload.my"];
async function extract8(embedUrl, req, kino2) {
  const origin = new URL(embedUrl).origin;
  const r = await req(embedUrl, { headers: { Referer: origin + "/" } });
  if (!r.ok) return miss(kino2, "nupload", "status " + r.status);
  const html = r.text();
  const arr = /([A-Za-z]+)\.forEach\s*\(function\s+\w+\s*\(value\)\s*\{[^}]+atob/.exec(html);
  if (!arr) return miss(kino2, "nupload", "no encoded address");
  const name = arr[1];
  const off = new RegExp(name + "\\.forEach[^-]+-\\s*(\\d+)").exec(html);
  const list = new RegExp("var\\s+" + name + "\\s*=\\s*(\\[[^\\]]+\\])").exec(html);
  const sesz = /var sesz\s*=\s*"([^"]+)"/.exec(html);
  if (!off || !list || !sesz) return miss(kino2, "nupload", "encoded address incomplete");
  let path = "";
  for (const v of JSON.parse(list[1])) {
    path += String.fromCharCode(parseInt(atob(v).replace(/\D/g, ""), 10) - parseInt(off[1], 10));
  }
  let url;
  try {
    url = new URL(path + "?s=" + sesz[1], origin).href;
  } catch (_) {
    return miss(kino2, "nupload", "bad address");
  }
  return /^https:\/\//i.test(url) ? { url, headers: { Referer: origin + "/", Origin: origin } } : miss(kino2, "nupload", "not https");
}

// src/extractors/byse.js
var byse_exports = {};
__export(byse_exports, {
  HOSTS: () => HOSTS9,
  b64urlToHex: () => b64urlToHex,
  extract: () => extract9
});
var HOSTS9 = ["filemoon.sx", "filemoon.link", "byse.sx", "bysezoxexe.com", "bysezejataos.com", "bysebuho.com", "bysevepoin.com", "byseqekaho.com"];
var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function b64urlToHex(s) {
  const text = String(s || "").replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
  let bits = 0, acc = 0, hex = "";
  for (const ch of text) {
    const v = B64.indexOf(ch);
    if (v < 0) return null;
    acc = acc << 6 | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      hex += (acc >> bits & 255).toString(16).padStart(2, "0");
      acc &= (1 << bits) - 1;
    }
  }
  return hex;
}
var codeOf = (url) => new URL(url).pathname.replace(/\/+$/, "").split("/").pop();
async function extract9(embedUrl, req, kino2) {
  let u;
  try {
    u = new URL(embedUrl);
  } catch (_) {
    return null;
  }
  const code = codeOf(embedUrl);
  if (!/^[\w-]{4,40}$/.test(code)) return miss(kino2, "byse", "no code");
  const d = await req(u.origin + "/api/videos/" + code + "/embed/details", { headers: { Accept: "application/json", Referer: u.origin + "/" } });
  if (!d.ok) return miss(kino2, "byse", "details " + d.status);
  const frame = d.json() && d.json().embed_frame_url;
  let f;
  try {
    f = new URL(frame);
  } catch (_) {
    return miss(kino2, "byse", "no frame");
  }
  const p = await req(f.origin + "/api/videos/" + codeOf(frame) + "/embed/playback", {
    headers: { Accept: "*/*", Referer: frame, "x-embed-parent": embedUrl }
  });
  if (!p.ok) return miss(kino2, "byse", "playback " + p.status);
  const pb = p.json() && p.json().playback;
  if (!pb || !Array.isArray(pb.key_parts) || pb.key_parts.length < 2) return miss(kino2, "byse", "no key");
  const key = b64urlToHex(pb.key_parts[0]) + b64urlToHex(pb.key_parts[1]);
  const iv = b64urlToHex(pb.iv);
  const data = b64urlToHex(pb.payload);
  if (!/^[0-9a-f]+$/.test(key + (iv || "x") + (data || "x"))) return miss(kino2, "byse", "bad key material");
  const alg = key.length === 32 ? "aes-128-gcm" : key.length === 48 ? "aes-192-gcm" : key.length === 64 ? "aes-256-gcm" : null;
  if (!alg) return miss(kino2, "byse", "key of " + key.length / 2 + " bytes");
  let json;
  try {
    json = kino2.crypto.decrypt(alg, { key, iv, data, keyEncoding: "hex", ivEncoding: "hex", inputEncoding: "hex" });
  } catch (_) {
    return miss(kino2, "byse", "decrypt failed");
  }
  let sources;
  try {
    sources = JSON.parse(json.replace(/^﻿/, "")).sources;
  } catch (_) {
    return miss(kino2, "byse", "bad playback json");
  }
  const url = Array.isArray(sources) && sources[0] && sources[0].url;
  if (typeof url !== "string" || !/^https:\/\//.test(url)) return miss(kino2, "byse", "no source");
  return { url, mime: HLS_MIME, headers: { Referer: u.origin + "/" } };
}

// src/extractors/uqload.js
var uqload_exports = {};
__export(uqload_exports, {
  HOSTS: () => HOSTS10,
  extract: () => extract10,
  sourceOf: () => sourceOf
});
var HOSTS10 = ["uqload.com", "uqload.co", "uqload.cx", "uqload.bz", "uqload.vc", "uqload.is", "uqload.io", "uqload.net"];
function sourceOf(text) {
  const m = /sources\s*:\s*\[\s*(?:\{\s*file\s*:\s*)?["'](https:[^"']+)["']/.exec(text || "");
  return m ? m[1] : null;
}
async function extract10(embedUrl, req, kino2) {
  const u = new URL(embedUrl);
  const html = await pageText(req, u.href, { Referer: u.origin + "/" }, kino2, "uqload");
  if (html == null) return null;
  const url = findIn(html, sourceOf);
  if (!url) return miss(kino2, "uqload", "no source in page");
  return { url, mime: /\.m3u8(\?|$)/i.test(url) ? HLS_MIME : "video/mp4", headers: { Referer: u.origin + "/" } };
}

// src/extractors/streamtape.js
var streamtape_exports = {};
__export(streamtape_exports, {
  HOSTS: () => HOSTS11,
  addressOf: () => addressOf,
  extract: () => extract11
});
var HOSTS11 = ["streamtape.com", "streamtape.net", "streamtape.xyz", "streamtape.to", "shavetape.cash", "watchadsontape.com", "tapewithadblock.org", "strtape.cloud", "strcloud.link", "stape.fun"];
function addressOf(text) {
  const line = /botlink'\)\.innerHTML\s*=\s*([^\n]*)/.exec(text || "");
  if (!line) return null;
  const head = /^\s*(?:'([^']*)'|"([^"]*)")/.exec(line[1]);
  if (!head) return null;
  let out = head[1] ?? head[2];
  const rest = line[1].slice(head[0].length);
  const part = /\+\s*\(\s*(?:'([^']*)'|"([^"]*)")\s*\)((?:\s*\.substring\(\s*\d+\s*\))*)/g;
  let m;
  while (m = part.exec(rest)) {
    let s = m[1] ?? m[2];
    for (const n of m[3].matchAll(/\.substring\(\s*(\d+)\s*\)/g)) s = s.substring(Number(n[1]));
    out += s;
  }
  if (out.startsWith("//")) out = "https:" + out;
  return /^https:\/\/[^/]+\/get_video\?/.test(out) ? out : null;
}
async function extract11(embedUrl, req, kino2) {
  const u = new URL(embedUrl);
  const html = await pageText(req, u.href, { Referer: u.origin + "/" }, kino2, "streamtape");
  if (html == null) return null;
  const url = addressOf(html);
  if (!url) return miss(kino2, "streamtape", "no address in page");
  return { url: url + "&stream=1", mime: "video/mp4", headers: { Referer: u.origin + "/" } };
}

// src/extractors/dood.js
var dood_exports = {};
__export(dood_exports, {
  HOSTS: () => HOSTS12,
  extract: () => extract12,
  passPath: () => passPath
});
var HOSTS12 = [
  "dood.la",
  "dood.yt",
  "dood.to",
  "dood.so",
  "dood.ws",
  "dood.pm",
  "dood.wf",
  "dood.re",
  "dood.cx",
  "dood.sh",
  "dood.li",
  "dood.watch",
  "doodstream.com",
  "dooood.com",
  "doods.pro",
  "d0000d.com",
  "d000d.com",
  "ds2play.com",
  "ds2video.com",
  "dsvplay.com",
  "vide0.net",
  "myvidplay.com",
  "playmogo.com"
];
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function passPath(html) {
  const m = /\/pass_md5\/[\w\-/]+/.exec(html || "");
  return m ? m[0] : null;
}
async function extract12(embedUrl, req, kino2) {
  const u = new URL(embedUrl.replace("/d/", "/e/"));
  const page = await req(u.href, { headers: { Referer: u.origin + "/" } });
  const path = page.ok ? passPath(page.text()) : null;
  if (!path) return captureMedia(u.href, req, kino2, "dood");
  const base = await req(u.origin + path, { headers: { Referer: u.href } });
  const head = base.ok ? base.text().trim() : "";
  if (!/^https:\/\//.test(head)) return captureMedia(u.href, req, kino2, "dood");
  let rand = "";
  for (let i = 0; i < 10; i++) rand += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const token = path.split("/").pop();
  return { url: head + rand + "?token=" + token + "&expiry=" + Date.now(), mime: "video/mp4", headers: { Referer: u.origin + "/" } };
}

// src/extractors/mixdrop.js
var mixdrop_exports = {};
__export(mixdrop_exports, {
  HOSTS: () => HOSTS13,
  extract: () => extract13,
  wurlOf: () => wurlOf
});
var HOSTS13 = ["mixdrop.top", "mixdrop.co", "mixdrop.to", "mixdrop.ch", "mixdrop.ag", "mixdrop.bz", "mixdrop.sx", "mixdrop.gl", "mxdrop.click", "mxcontent.net", "m1xdrop.com"];
function wurlOf(text) {
  const m = /wurl\s*=\s*"((?:https?:)?\/\/[^"]+)"/.exec(text || "");
  return m ? m[1] : null;
}
async function extract13(embedUrl, req, kino2) {
  const u = new URL(embedUrl.replace("/f/", "/e/"));
  const html = await pageText(req, u.href, { Referer: u.origin + "/" }, kino2, "mixdrop");
  if (html == null) return null;
  const raw = findIn(html, wurlOf);
  if (!raw) return miss(kino2, "mixdrop", "no wurl in page");
  const url = raw.startsWith("//") ? "https:" + raw : raw;
  if (!/^https:\/\//.test(url)) return miss(kino2, "mixdrop", "not https");
  return { url, mime: "video/mp4", headers: { Referer: u.origin + "/" } };
}

// src/extractors/mp4upload.js
var mp4upload_exports = {};
__export(mp4upload_exports, {
  HOSTS: () => HOSTS14,
  extract: () => extract14,
  srcOf: () => srcOf
});
var HOSTS14 = ["mp4upload.com"];
function srcOf(text) {
  const m = /player\.src\(\s*"([^"]+)"/.exec(text || "") || /player\.src\(\s*\{[\s\S]*?\bsrc\s*:\s*"([^"]+)"/.exec(text || "");
  return m ? m[1] : null;
}
async function extract14(embedUrl, req, kino2) {
  const id = /mp4upload\.com\/(?:embed-)?([A-Za-z0-9]+)/.exec(embedUrl);
  const page = id ? "https://www.mp4upload.com/embed-" + id[1] + ".html" : embedUrl;
  const html = await pageText(req, page, { Referer: "https://www.mp4upload.com/" }, kino2, "mp4upload");
  if (html == null) return null;
  const url = findIn(html, srcOf);
  if (!url || !/^https:\/\//.test(url)) return miss(kino2, "mp4upload", "no source in page");
  return { url, mime: /\.m3u8(\?|$)/i.test(url) ? "application/vnd.apple.mpegurl" : "video/mp4", headers: { Referer: "https://www.mp4upload.com/" } };
}

// src/extractors/hexload.js
var hexload_exports = {};
__export(hexload_exports, {
  HOSTS: () => HOSTS15,
  extract: () => extract15,
  formOf: () => formOf
});
var HOSTS15 = ["hexload.com"];
function formOf(html) {
  const block = /data\s*:\s*\{([^}]*)\}/.exec(html || "");
  if (!block) return null;
  const out = {};
  for (const m of block[1].matchAll(/(\w+)\s*:\s*['"]([\w-]+)['"]/g)) out[m[1]] = m[2];
  return Object.keys(out).length ? out : null;
}
async function extract15(embedUrl, req, kino2) {
  const u = new URL(embedUrl);
  const html = await pageText(req, u.href, { Referer: u.origin + "/" }, kino2, "hexload");
  if (html == null) return null;
  const form = formOf(html);
  if (!form) return miss(kino2, "hexload", "no request form in page");
  const r = await req(u.origin + "/download", { method: "POST", body: { form }, headers: { Referer: u.href, Accept: "application/json" } });
  if (!r.ok) return miss(kino2, "hexload", "download " + r.status);
  const j = r.json();
  const url = j && j.result && j.result.url;
  if (typeof url !== "string" || !/^https:\/\//.test(url)) return miss(kino2, "hexload", "no address");
  return { url, mime: /\.m3u8(\?|$)/i.test(url) ? "application/vnd.apple.mpegurl" : "video/mp4", headers: { Referer: u.origin + "/" } };
}

// src/extractors/savefiles.js
var savefiles_exports = {};
__export(savefiles_exports, {
  HOSTS: () => HOSTS16,
  extract: () => extract16
});
var HOSTS16 = ["savefiles.com", "streamhls.to"];
async function extract16(embedUrl, req, kino2) {
  return captureMedia(embedUrl, req, kino2, "savefiles");
}

// src/extractors/index.js
var TABLE = { goodstream: goodstream_exports, vimeos: vimeos_exports, streamwish: streamwish_exports, vidhide: vidhide_exports, fastream: fastream_exports, voe: voe_exports, okru: okru_exports, nupload: nupload_exports, byse: byse_exports, uqload: uqload_exports, streamtape: streamtape_exports, dood: dood_exports, mixdrop: mixdrop_exports, mp4upload: mp4upload_exports, hexload: hexload_exports, savefiles: savefiles_exports };
function extractorFor(embedUrl) {
  let host;
  try {
    host = new URL(embedUrl).hostname.replace(/^www\./, "");
  } catch (_) {
    return null;
  }
  for (const [name, mod] of Object.entries(TABLE)) {
    if (mod.HOSTS.some((h) => host === h || host.endsWith("." + h))) return { name, extract: mod.extract };
  }
  return null;
}
var HOSTS17 = Object.values(TABLE).flatMap((m) => m.HOSTS);

// src/site.js
var SITE = "https://latanime.org";
var HTTPS = /^https:\/\//;
var decode = (s) => String(s || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/\s+/g, " ").trim();
var absolute2 = (href) => {
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
    const poster = img ? absolute2(img[1]) : "";
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
      ...still && HTTPS.test(absolute2(still[1])) ? { still: absolute2(still[1]) } : {}
    });
  }
  const p = poster ? absolute2(poster[1]) : "";
  const b = og ? absolute2(og[1]) : "";
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

// src/browse/logo.js
var LOGO_ASPECT = "417:120";
var LOGO_DATA = "data:image/png;base64,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";

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
var brandNode = (brand) => ({
  type: "Image",
  key: "logo",
  url: LOGO_DATA,
  aspect: LOGO_ASPECT,
  fit: "contain",
  h: 40,
  alt: brand,
  altEn: brand,
  fallback: { type: "Text", text: brand, textEn: brand, style: "h4" }
});
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
    const order2 = [tab, ...TAB_IDS.filter((t2) => t2 !== tab)];
    return order2.filter((t2, i) => (i === 0 || device !== "tv") && !(memo.get(t2) && memo.get(t2).whole));
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
var BRAND = "LatAnime";
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
async function pageText2(url) {
  const r = await kino.fetch(url, { headers: { "User-Agent": UA, Accept: "text/html" } });
  if (!r.ok) throw kino.error("unavailable", url + " answered " + r.status, { userMessage: t(kino, "siteDown") });
  return r.text();
}
async function listing(ref, page = 1) {
  const url = listUrl(ref, page);
  if (!url) return { items: [], next: void 0 };
  const html = await pageText2(url);
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
  const html = await pageText2(SITE + "/buscar?q=" + encodeURIComponent(q));
  return parseCards(html).slice(0, 60);
}
async function episodes(ref) {
  if (!/^[\w-]{1,160}$/.test(String(ref || ""))) throw kino.error("not_found");
  const info = parseAnime(await pageText2(SITE + "/anime/" + ref));
  if (!info) throw kino.error("not_found", "no such anime");
  const list = info.episodes.map((e) => ({ season: 1, number: Math.min(99999, Math.max(1, Math.floor(e.number))), ref: e.ref, title: e.title, ...e.still ? { still: e.still } : {} }));
  list.sort((a, b) => a.number - b.number);
  return {
    series: { title: info.title, overview: info.overview, poster: info.poster, backdrop: info.backdrop, genres: info.genres },
    episodes: list
  };
}
var PREFER = ["streamwish", "vidhide", "mp4upload", "mixdrop", "uqload", "hexload", "okru", "voe", "byse", "streamtape", "dood", "savefiles"];
var understood = (link) => extractorFor(link) !== null;
function rankOf(name) {
  const i = PREFER.indexOf(name);
  return i < 0 ? PREFER.length : i;
}
function serversOf(html, preferred = "") {
  const list = parsePlayers(html).filter((p) => understood(p.link)).map((p, n) => ({ ...p, n, kind: extractorFor(p.link).name }));
  const rank = (k) => k === preferred ? -1 : rankOf(k);
  return list.sort((a, b) => rank(a.kind) - rank(b.kind) || a.n - b.n).slice(0, MAX_COPIES);
}
var labelOf = (s) => (s.name + " \xB7 " + hostName(s.link)).slice(0, 48);
function hostName(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch (_) {
    return "servidor";
  }
}
async function resolve(ref) {
  const [slug, pick] = String(ref || "").split("|");
  if (!/^[\w-]{1,160}$/.test(slug)) throw kino.error("not_found");
  let preferred = "";
  try {
    preferred = String(kino.config.get("server") || "");
  } catch (_) {
  }
  const servers = serversOf(await pageText2(SITE + "/ver/" + slug), preferred === "auto" ? "" : preferred);
  if (!servers.length) throw kino.error("not_found", "no servers", { userMessage: t(kino, "noServer") });
  const pool = requestPool(54);
  const deadline = Date.now() + CALL_MS2;
  const open = (s) => extractorFor(s.link).extract(s.link, makeRequester(kino, { budget: 6, deadline, pools: [pool], maxMs: 8e3 }), kino).catch(() => null);
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
        details[i] = parseAnime(await pageText2(SITE + "/anime/" + it.ref));
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
  return browseScreen().view(ctx && typeof ctx === "object" ? ctx : {});
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
  listUrl,
  metaTitle,
  metaType,
  resolve,
  screen,
  screenEvent,
  search,
  serversOf
};
