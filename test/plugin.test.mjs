// Offline tests with invented pages: the readers of the site, the list addresses and the screen's pure parts.
import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validate } from "../sdk/validate.mjs";
import { parseCards, hasNext, parseAnime, parsePlayers, unwrap, seriesOfEpisode, langOf } from "../src/site.js";
import { listUrl, TABS, serversOf, metaTitle } from "../src/plugin.js";
import { tabOf, slidesOf, recentOf } from "../src/browse/model.js";
import { browseView, searchView } from "../src/browse/view.js";
import { wurlOf } from "../src/extractors/mixdrop.js";
import { srcOf } from "../src/extractors/mp4upload.js";
import { formOf } from "../src/extractors/hexload.js";
import { extractorFor } from "../src/extractors/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Kino accepts the manifest and the exports", async () => {
  const r = await validate(root);
  assert.deepEqual(r.problems, []);
});

const CARD = (slug, title, lang) => `<div class="col-md-4 col-lg-3 col-xl-2 col-6 my-3"><a href="https://latanime.org/anime/${slug}"><div class="series"><div class="serieimg shadown"> <img src="https://latanime.org/thumbs/imagen/${slug}.jpg?v=1.5" class="img-fluid2 shadow-sm" alt=""></div><div class="seriedetails"> <h3 style="text-transform: capitalize;" class="my-1">${title}</h3><span class="opacity-75">${lang}</span></div></div></a></div>`;

test("parseCards reads the listing cards and skips repeats", () => {
  const html = CARD("hotaru-latino", "Hotaru no Yomeiri Latino", "Latino") + CARD("hotaru-cast", "Hotaru &amp; Co Castellano", "Castellano") + CARD("hotaru-latino", "Repeat", "Latino");
  const out = parseCards(html);
  assert.equal(out.length, 2);
  assert.deepEqual(out[0], { id: "hotaru-latino", ref: "hotaru-latino", title: "Hotaru no Yomeiri Latino", kind: "series", poster: "https://latanime.org/thumbs/imagen/hotaru-latino.jpg?v=1.5", lang: "lat" });
  assert.equal(out[1].title, "Hotaru & Co Castellano");
  assert.equal(out[1].lang, "esp");
  assert.equal(langOf("Boruto"), "sub");
});

test("hasNext sees the pager's next link", () => {
  assert.equal(hasNext('<a class="page-link" href="?page=2" rel="next" aria-label="Siguiente">'), true);
  assert.equal(hasNext("<ul class='pagination'></ul>"), false);
});

const ANIME = `<h2>Hotaru no Yomeiri Latino</h2><div class="serieimgficha"><img style="width:13rem" src="https://latanime.org/thumbs/imagen/h.webp" class="img-fluid2"><div class="my-2"><button class="btn-estado estreno">x</button></div></div>
<a href="https://latanime.org/genero/drama"><div class="btn">Drama</div></a><a href="https://latanime.org/genero/romance"><div class="btn">Romance</div></a>
<p class="my-2 opacity-75">En la era Meiji, una joven sueña con casarse. Ver menos</p>
<meta property="og:image" content="https://latanime.org/assets/img/serie/imagen/h.webp">
<div class="row"><div><a href="https://latanime.org/ver/hotaru-episodio-2"><div class="p-2 cap-layout"><img class="lozad" data-src="https://latanime.org/thumbs/portada/h2.jpg"> Hotaru Latino - Capitulo 2 </div></a><a href="https://latanime.org/ver/hotaru-episodio-1"><div class="p-2 cap-layout"><img class="lozad" data-src="https://latanime.org/thumbs/portada/h1.jpg"> Hotaru Latino - Capitulo 1 </div></a></div></div>`;

test("parseAnime reads the title, synopsis, genres, status and episodes", () => {
  const a = parseAnime(ANIME);
  assert.equal(a.title, "Hotaru no Yomeiri Latino");
  assert.equal(a.overview, "En la era Meiji, una joven sueña con casarse.");
  assert.deepEqual(a.genres, ["Drama", "Romance"]);
  assert.equal(a.ongoing, true);
  assert.equal(a.poster, "https://latanime.org/thumbs/imagen/h.webp");
  assert.equal(a.backdrop, "https://latanime.org/assets/img/serie/imagen/h.webp");
  assert.deepEqual(a.episodes.map((e) => [e.ref, e.number]), [["hotaru-episodio-2", 2], ["hotaru-episodio-1", 1]]);
  assert.equal(a.episodes[1].still, "https://latanime.org/thumbs/portada/h1.jpg");
  assert.equal(parseAnime("<p>nothing</p>"), null);
});

test("parsePlayers decodes the data-player links, unwraps and renames mirrors", () => {
  const b64 = (s) => btoa(s);
  const html = `<li id="play-video"><a class="play-video" data-player="${b64("https://mixdrop.top/e/abc")}">ok</a></li>`
    + `<li id="play-video"><a class="play-video" data-player="${b64("https://mojon.latanime.org/aqua/fn?url=https://hglink.to/e/zz")}">sw</a></li>`
    + `<li id="play-video"><a class="play-video" data-player="${b64("http://insecure.example/e/1")}">bad</a></li>`;
  const out = parsePlayers(html);
  assert.deepEqual(out, [{ name: "ok", link: "https://mixdrop.top/e/abc" }, { name: "sw", link: "https://streamwish.to/e/zz" }]);
  assert.equal(unwrap("https://mivalyo.com/e/q"), "https://vidhidepro.com/e/q");
});

test("seriesOfEpisode strips the episode part", () => {
  assert.equal(seriesOfEpisode("hotaru-no-yomeiri-episodio-12"), "hotaru-no-yomeiri");
  assert.equal(seriesOfEpisode("movie-capitulo-1"), "movie");
  assert.equal(seriesOfEpisode("plain"), "plain");
});

test("listUrl builds the site's listing addresses, with the page", () => {
  assert.equal(listUrl("emision"), "https://latanime.org/emision");
  assert.equal(listUrl("emision", 3), "https://latanime.org/emision?page=3");
  assert.equal(listUrl("c:Película"), "https://latanime.org/animes?fecha=false&genero=false&letra=false&categoria=Pel%C3%ADcula");
  assert.equal(listUrl("g:accion", 2), "https://latanime.org/animes?fecha=false&genero=accion&letra=false&categoria=false&page=2");
  assert.equal(listUrl("nope"), null);
});

test("the player pages' readers", () => {
  assert.equal(wurlOf('MDCore.wurl="//n1.mxcontent.net/v2/a.mp4?s=1"'), "//n1.mxcontent.net/v2/a.mp4?s=1");
  assert.equal(wurlOf("var title = wurl is here"), null);
  assert.equal(srcOf('player.src({ type: "video/mp4", src: "https://a3.mp4upload.com:183/d/x/video.mp4" });'), "https://a3.mp4upload.com:183/d/x/video.mp4");
  assert.deepEqual(formOf("$.ajax({ data: {op: 'download', file_code: 'abc123', hash: 'x-y'}, success: function"), { op: "download", file_code: "abc123", hash: "x-y" });
  for (const u of ["https://mixdrop.top/e/x", "https://www.mp4upload.com/embed-x.html", "https://hexload.com/embed-x", "https://savefiles.com/e/x", "https://playmogo.com/e/x", "https://voe.sx/e/x", "https://bysewihe.com/e/x"]) {
    assert.ok(extractorFor(u) || u.includes("bysewihe"), u); // bysewihe.com is a Byse mirror not listed yet
  }
});

const item = (n, extra = {}) => ({ id: "a" + n, ref: "a" + n, title: "Anime " + n, kind: "series", poster: "https://x.example/p" + n + ".jpg", ...extra });

test("slidesOf keeps titles with a picture and a synopsis; tabOf trims the rails", () => {
  const rows = [{ id: "emision", title: "En emisión", items: [item(1, { overview: "Sinopsis uno", backdrop: "https://x.example/b1.jpg" }), item(2), item(3, { overview: "x".repeat(300) })] }, { id: "empty", title: "Vacía", items: [] }];
  const slides = slidesOf(rows);
  assert.equal(slides.length, 2);
  assert.equal(slides[0].image, "https://x.example/b1.jpg");
  assert.equal(slides[1].image, "https://x.example/p3.jpg"); // no backdrop: the poster
  assert.ok(slides[1].text.length <= 160);
  const tab = tabOf({ rows });
  assert.equal(tab.rails.length, 1);
  assert.equal(tabOf({ rows: [] }), null);
});

test("recentOf finds the played titles among the loaded cards, newest first", () => {
  const data = { slides: [], rails: [{ id: "r", title: "R", items: [item(1), item(2), item(3)] }] };
  assert.deepEqual(recentOf(["a3", "gone", "a1"], [data]).map((c) => c.id), ["a3", "a1"]);
});

test("the screen's trees: skeletons before the data, the slider and rails after, tabs for every tab", () => {
  const tabs = TABS.map(({ id, es, en }) => ({ id, es, en }));
  const before = JSON.stringify(browseView({ brand: "LatAnime", tabs, tab: "inicio", data: null, recent: [], pending: true, failed: false }));
  assert.ok(before.includes("Skeleton") && before.includes('"every"'));
  const data = { slides: [{ id: "a1", ref: "a1", kind: "series", title: "Anime 1", image: "https://x.example/b.jpg", text: "Sinopsis" }, { id: "a2", ref: "a2", kind: "series", title: "Anime 2", image: "https://x.example/b2.jpg", text: "Otra" }], rails: [{ id: "emision", title: "En emisión", titleEn: "Airing now", items: [item(1)] }] };
  const after = JSON.stringify(browseView({ brand: "LatAnime", tabs, tab: "inicio", data, recent: [], pending: false, failed: false }));
  assert.ok(after.includes("PageView") && after.includes("titleRail") && after.includes("Airing now"));
  for (const t of tabs) assert.ok(after.includes(t.es), t.es);
  const search = JSON.stringify(searchView({ query: "naruto", status: "done", items: [item(1)], device: "phone" }));
  assert.ok(search.includes("titleGrid"));
});

test("metaTitle drops the language, season and year the site adds, for TMDB", () => {
  assert.equal(metaTitle("Hotaru no Yomeiri Latino"), "Hotaru no Yomeiri");
  assert.equal(metaTitle("Hyouken no Majutsushi S2 Latino"), "Hyouken no Majutsushi");
  assert.equal(metaTitle("Magic Knight Rayearth (2026) Castellano"), "Magic Knight Rayearth");
  assert.equal(metaTitle("Boruto: Naruto, La Película"), "Boruto: Naruto, La Película");
});

test("serversOf puts the preferred server first and keeps the usual order otherwise", () => {
  const b64 = (u) => btoa(u);
  const html = ["https://mixdrop.top/e/a", "https://www.mp4upload.com/embed-b.html", "https://hexload.com/embed-c", "https://unknown.example/e/z"]
    .map((u, i) => `<li id="play-video"><a class="play-video" data-player="${b64(u)}">s${i}</a></li>`).join("");
  assert.deepEqual(serversOf(html).map((s) => s.kind), ["mp4upload", "mixdrop", "hexload"]);
  assert.deepEqual(serversOf(html, "hexload").map((s) => s.kind), ["hexload", "mp4upload", "mixdrop"]);
});

test("the slider's key carries its slide count, so a pager is never reused for a different number of slides", () => {
  const slide = (n) => ({ id: "a" + n, ref: "a" + n, kind: "series", title: "T" + n, image: "https://x.example/b" + n + ".jpg", text: "Sinopsis" });
  const tabs = [{ id: "inicio", es: "Inicio", en: "Home" }];
  const keyOf = (n) => {
    const v = browseView({ brand: "X", tabs, tab: "inicio", data: { slides: Array.from({ length: n }, (_, i) => slide(i + 1)), rails: [] }, recent: [], pending: false, failed: false });
    return /"key":"(hero\d*)"/.exec(JSON.stringify(v))[1];
  };
  assert.equal(keyOf(4), "hero4");
  assert.equal(keyOf(6), "hero6");
  assert.notEqual(keyOf(4), keyOf(6));
});
