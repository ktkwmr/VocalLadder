// Values for the articles, read from the app (public/vocalladder/index.html) so they cannot drift from it:
// the built-in patterns and their names, the note names, and the pattern parser.
// Used by scripts/pages/patterns.mjs and warmup-scales.mjs. The build stops if the app's code
// can no longer be read here.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const SRC = readFileSync(new URL("../../public/vocalladder/index.html", import.meta.url), "utf8").replace(/\r\n/g, "\n");

function pick(re, label) {
  const m = SRC.match(re);
  if (!m) throw new Error(`scripts/pages/vocal.mjs: ${label} not found in index.html`);
  return m[1];
}
const I18N = vm.runInNewContext("(" + pick(/const I18N = (\{[\s\S]*?\n {6}\});/, "I18N") + ")");
// The app's note names, scale steps, and parser (parsePattern), run with a stand-in for t()
const code = [
  pick(/(const NAMES = [^\n]*\n\s*const noteName = [^\n]*)/, "NAMES / noteName"),
  pick(/(const DEG = [\s\S]*?\n      \}\n)/, "DEG / parsePattern"),
  "const PRESETS = " + pick(/const PRESETS = (\[[\s\S]*?\n {6}\]);/, "PRESETS") + ";",
  pick(/(const CUE_BEATS = [^\n]*)/, "CUE_BEATS"),
  "({ noteName, parsePattern, PRESETS, CUE_BEATS })",
].join("\n");
const app = vm.runInNewContext(code, { t: (key, vars) => key + (vars ? " " + JSON.stringify(vars) : "") });

export const noteName = app.noteName;
export const CUE_BEATS = app.CUE_BEATS;
export function parse(text) {
  const p = app.parsePattern(text);
  if (p.error) throw new Error(`scripts/pages/vocal.mjs: cannot read the pattern "${text}" (${p.error})`);
  return p;
}
export const label = (lang, key) => {
  const s = I18N[lang][key];
  if (s === undefined) throw new Error(`scripts/pages/vocal.mjs: I18N.${lang} has no key "${key}"`);
  return s;
};
// Built-in patterns: { id, text, name: {en, ja}, notes, lo, hi, beats (melody), keyBeats (with the chord) }
export const PRESETS = app.PRESETS.map((q) => {
  const p = parse(q.text);
  const beats = p.notes.reduce((a, n) => a + n.beats, 0);
  return { id: q.id, text: q.text, name: { en: label("en", "p." + q.id), ja: label("ja", "p." + q.id) }, notes: p.notes, lo: p.lo, hi: p.hi, beats, keyBeats: beats + CUE_BEATS };
});
// Solfège of one note of a pattern, as the app shows it
export const solfa = (lang, n) => (n.rest ? "–" : (n.acc > 0 ? "♯" : n.acc < 0 ? "♭" : "") + label(lang, "solfa").split(",")[n.deg]);
