// The Home: row ids Kino accepts, and a slow list left off at the budget.
import test from "node:test";
import assert from "node:assert/strict";

const CARD = (slug, title, lang) => `<div class="col-md-4 col-lg-3 col-xl-2 col-6 my-3"><a href="https://latanime.org/anime/${slug}"><div class="series"><div class="serieimg shadown"> <img src="https://latanime.org/thumbs/imagen/${slug}.jpg?v=1.5" class="img-fluid2 shadow-sm" alt=""></div><div class="seriedetails"> <h3 style="text-transform: capitalize;" class="my-1">${title}</h3><span class="opacity-75">${lang}</span></div></div></a></div>`;

let clock = 0;
let hang = false;
globalThis.kino = {
  lang: "es",
  config: { get: () => undefined },
  storage: { get: () => null, set() {}, keys: () => [], remove() {} },
  fetch: (url) => {
    if (hang && /accion|comedia/.test(url)) return new Promise(() => {}); // those lists never answer
    return Promise.resolve({ ok: true, status: 200, text: () => CARD("a-" + Math.abs(url.length), "Anime", "Latino") });
  },
  sleep: async () => { clock += 1; await new Promise((r) => setImmediate(r)); }, // a tick per wait
  log() {},
  error: (code, message, opts = {}) => Object.assign(new Error(message), { code, ...opts }),
};
const realNow = Date.now;
const plugin = await import("../src/plugin.js");

test("the plugin asks Kino to drop the requests a call leaves running", () => {
  assert.equal(globalThis.__kinoDropPendingFetches, true);
});

test("every row has an id Kino accepts and still opens its list through its ref", async () => {
  const rows = await plugin.home();
  assert.equal(rows.length, 5);
  for (const r of rows) assert.match(r.id, /^[\w-]+$/, r.id);
  assert.equal(new Set(rows.map((r) => r.id)).size, 5);
  assert.ok(rows.some((r) => r.ref === "g:accion" && r.id === "g-accion"));
});

test("a list that never answers is left off and the others are shown at the budget", async () => {
  hang = true;
  clock = 0;
  Date.now = () => 1e12 + clock;
  try {
    const rows = await plugin.home();
    assert.deepEqual(rows.map((r) => r.ref), ["emision", "animes", "c:Película"]);
    assert.ok(clock <= 12000, "gave up at the budget, clock " + clock);
  } finally { Date.now = realNow; hang = false; }
});
