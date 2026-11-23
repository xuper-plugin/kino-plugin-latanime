// Every text the person reads, in Spanish and English: Kino does not translate a plugin's texts.
const T = {
  needResolver: ["Instala el motor de reproducción para ver esto. Es gratis y se hace una sola vez.", "Install the playback engine to watch this. It is free and done once."],
  noServer: ["Este episodio no tiene ahora un servidor que abra. Intenta de nuevo más tarde.", "This episode has no server that opens right now. Try again later."],
  siteDown: ["El sitio no responde ahora. Intenta de nuevo en un rato.", "The site is not answering right now. Try again in a moment."],
};

/** `key` in both languages: `{ es, en }`, with `{name}` placeholders filled from [vars]. */
export function both(key, vars = {}) {
  const pair = T[key] || [key, key];
  const fill = (s) => s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : ""));
  return { es: fill(pair[0]), en: fill(pair[1]) };
}

/** `key` in the person's language (anything that is not Spanish reads English). */
export function t(kino, key, vars) {
  const w = both(key, vars);
  return String((kino && kino.lang) || "").toLowerCase().startsWith("es") ? w.es : w.en;
}
