// resolve(): every server the page lists goes to the shared kino-resolver door (the hidden browser for what it can't open
// inline), a resolved stream is peeked at before it plays, and every server's result feeds the learned ranking.
import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";

const SITE = "https://latanime.org";
let pages = {};
let deadUrls = new Set();
let door = () => ({ streams: [], error: "needs_browser" });
let captures = [];
let captureImpl = () => ({ media: [] });
const store = new Map();
const doorAsked = [];
globalThis.kino = {
  lang: "es",
  config: { get: () => null },
  log: () => {},
  error: (code, message, opts = {}) => Object.assign(new Error(message), { code, ...opts }),
  storage: { get: (k) => store.get(k) ?? null, set: (k, v) => store.set(k, String(v)), keys: () => [...store.keys()], remove: (k) => store.delete(k) },
  fetch: async (url) => {
    if (deadUrls.has(url)) return { ok: false, status: 504, url, text: () => "" };
    if (pages[url] !== undefined) return { ok: true, status: 200, url, text: () => pages[url] };
    if (/\.m3u8(\?|$)/.test(url)) return { ok: true, status: 200, url, text: () => "#EXTM3U\n" };
    if (/\.mp4(\?|$)/.test(url)) return { ok: true, status: 206, url, text: () => "\0\0\0 ftypisom" };
    return { ok: false, status: 404, url, text: () => "" };
  },
  plugins: { call: async (alias, method, args) => {
    if (method === "normalizeHost") return { host: "x" };
    if (method === "resolve") { doorAsked.push(args.url); return door(args); }
    throw Object.assign(new Error(method), { code: "not_declared" });
  } },
  browser: { capture: async (url) => { captures.push(url); return captureImpl(url); } },
};
const plugin = await import("../src/plugin.js");

const SLUG = "x-episodio-1";
const players = (...urls) => urls.map((u, i) => `<li><a class="play-video" data-player="${btoa(u)}">s${i}</a></li>`).join("");
const MP4 = "https://www.mp4upload.com/embed-a.html", LULU = "https://luluvdo.com/e/b", UNKNOWN = "https://listeamed.net/e/c", VOE = "https://voe.sx/e/d";

beforeEach(() => {
  pages = { [`${SITE}/ver/${SLUG}`]: players(MP4, LULU, UNKNOWN, VOE) };
  deadUrls = new Set(); captures = []; captureImpl = () => ({ media: [] }); store.clear(); doorAsked.length = 0;
  door = ({ url }) => (url === MP4 ? { streams: [{ url: "https://cdn.test/mp4u/video.mp4", kind: "mp4" }] }
    : url === LULU ? { streams: [{ url: "https://cdn.test/lulu/master.m3u8", kind: "hls" }] } : { streams: [], error: "needs_browser" });
});

test("every server the page lists is offered, even a host the plugin never named (lulu, an unknown one)", async () => {
  const s = await plugin.resolve(SLUG);
  assert.equal(s.url, "https://cdn.test/mp4u/video.mp4");
  const labels = [s.label, ...s.alternatives.map((a) => a.label)].join(" ");
  for (const h of ["mp4upload.com", "luluvdo.com", "listeamed.net", "voe.sx"]) assert.ok(labels.includes(h), h);
});

test("a resolved stream whose CDN does not answer is passed over: the next server plays", async () => {
  deadUrls.add("https://cdn.test/mp4u/video.mp4");
  const s = await plugin.resolve(SLUG);
  assert.equal(s.url, "https://cdn.test/lulu/master.m3u8");
  assert.ok(!s.alternatives.some((a) => a.url === "https://cdn.test/mp4u/video.mp4"), "the dead copy is never offered as a ready stream");
});

test("the learned ranking: the server that fails sinks and the one that plays is asked first next time", async () => {
  deadUrls.add("https://cdn.test/mp4u/video.mp4");
  assert.equal((await plugin.resolve(SLUG)).url, "https://cdn.test/lulu/master.m3u8");
  const score = plugin.serverScores();
  assert.ok(score("lulu") > score("mp4upload"));
  // The page puts mp4upload first; with the history, lulu leads the plain-request group.
  const order = plugin.serversOf(pages[`${SITE}/ver/${SLUG}`], "", score).map((x) => x.kind);
  assert.deepEqual(order.slice(0, 2), ["lulu", "mp4upload"]);
  // voe was tried in the same batch and its capture found nothing, so it also sank below the untried unknown host.
  assert.deepEqual(order.slice(2), ["listeamed.net", "voe"], "the hosts that need the browser stay last, ordered by what they did");
});

test("a host the resolver can't open inline is captured in the hidden browser; a dead file is not", async () => {
  door = ({ url }) => (url === UNKNOWN ? { streams: [], error: "needs_browser" } : { streams: [], error: "dead" });
  captureImpl = () => ({ media: [{ url: "https://cdn.test/cap/master.m3u8", headers: { Referer: "https://listeamed.net/" } }] });
  const s = await plugin.resolve(SLUG);
  assert.equal(s.url, "https://cdn.test/cap/master.m3u8");
  assert.deepEqual(captures, [UNKNOWN], "only the unknown host went to the hidden browser");
});
