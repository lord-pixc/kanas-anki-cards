// Genera src/data/stroke-data.ts a partir del dataset oficial de KanjiVG.
// KanjiVG © Ulrich Apel — licencia CC BY-SA 3.0 (https://kanjivg.tagaini.net)
//
// Uso: node scripts/gen-strokes.mjs
//
// KanjiVG entrega un SVG por carácter (viewBox 0 0 109 109) con los trazos
// en orden. Los youon (きゃ, しゅ…) no existen como archivo único, así que
// se componen: carácter base a tamaño ~0.85 + kana pequeño a ~0.45 abajo-derecha.

import { writeFile } from "node:fs/promises";

const BASE = "https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji";

const hiraganaSingles = [
  // básico
  "あ","い","う","え","お","か","き","く","け","こ",
  "さ","し","す","せ","そ","た","ち","つ","て","と",
  "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も","や","ゆ","よ","ら","り",
  "る","れ","ろ","わ","を","ん",
  // dakuten
  "が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ",
  "だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ",
  // handakuten
  "ぱ","ぴ","ぷ","ぺ","ぽ",
  // pequeños (para componer youon)
  "ゃ","ゅ","ょ",
];

const katakanaSingles = [
  "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
  "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
  "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
  "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ",
  "ル","レ","ロ","ワ","ヲ","ン",
  "ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ",
  "ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ",
  "パ","ピ","プ","ペ","ポ",
  "ャ","ュ","ョ",
];

const youonBases = ["き","ぎ","し","じ","ち","に","ひ","び","ぴ","み","り"];
const youonBasesKa = ["キ","ギ","シ","ジ","チ","ニ","ヒ","ビ","ピ","ミ","リ"];
const smalls = ["ゃ","ゅ","ょ"];
const smallsKa = ["ャ","ュ","ョ"];

const hiraganaYouon = youonBases.flatMap((b) => smalls.map((s) => b + s));
const katakanaYouon = youonBasesKa.flatMap((b) => smallsKa.map((s) => b + s));

function codepointFile(ch) {
  return ch.codePointAt(0).toString(16).padStart(5, "0") + ".svg";
}

async function fetchStrokes(ch, cache) {
  if (cache.has(ch)) return cache.get(ch);
  const url = `${BASE}/${codepointFile(ch)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`! ${ch} (${url}) -> HTTP ${res.status}`);
    cache.set(ch, []);
    return [];
  }
  const svg = await res.text();
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  cache.set(ch, paths);
  return paths;
}

const round = (n) => Math.round(n * 100) / 100;

// Transforma una path SVG aplicando escala uniforme + traslación.
// KanjiVG: comando absoluto inicial (M) seguido de comandos relativos.
// Reglas: coord absoluta -> v*s + t ; coord relativa (delta) -> v*s.
function transformPath(d, s, tx, ty) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const patterns = {
    m: ["x", "y"], l: ["x", "y"], t: ["x", "y"],
    h: ["x"], v: ["y"],
    c: ["x", "y", "x", "y", "x", "y"],
    s: ["x", "y", "x", "y"],
    q: ["x", "y", "x", "y"],
    a: ["r", "r", "n", "n", "n", "x", "y"],
    z: [],
  };
  const out = [];
  let i = 0;
  let cmd = "";
  while (i < tokens.length) {
    const tk = tokens[i];
    if (/[a-zA-Z]/.test(tk)) {
      cmd = tk;
      out.push(tk);
      i++;
      if (cmd.toLowerCase() === "z") continue;
    }
    const lc = cmd.toLowerCase();
    const pat = patterns[lc] || ["x", "y"];
    const abs = cmd === cmd.toUpperCase();
    for (let k = 0; k < pat.length && i < tokens.length; k++) {
      let val = parseFloat(tokens[i]);
      i++;
      const type = pat[k];
      if (type === "x") val = abs ? val * s + tx : val * s;
      else if (type === "y") val = abs ? val * s + ty : val * s;
      else if (type === "r") val = val * s;
      out.push(round(val));
    }
    // tras un M/m implícito el resto son lineto
    if (lc === "m") cmd = abs ? "L" : "l";
  }
  return out
    .map((t) => (typeof t === "string" ? t : String(t)))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const cache = new Map();
  const hiOut = {};
  const kaOut = {};

  async function addSingle(target, ch) {
    target[ch] = await fetchStrokes(ch, cache);
    process.stdout.write(".");
  }

  console.log("Descargando hiragana…");
  for (const ch of hiraganaSingles) await addSingle(hiOut, ch);
  console.log("\nDescargando katakana…");
  for (const ch of katakanaSingles) await addSingle(kaOut, ch);

  // Componer youon: base 0.85 desplazado izquierda-arriba + pequeño 0.45 abajo-derecha
  const B_S = 0.85, B_TX = -6, B_TY = 4;
  const S_S = 0.46, S_TX = 60, S_TY = 56;

  function compose(baseStrokes, smallStrokes) {
    return [
      ...baseStrokes.map((d) => transformPath(d, B_S, B_TX, B_TY)),
      ...smallStrokes.map((d) => transformPath(d, S_S, S_TX, S_TY)),
    ];
  }

  console.log("Componiendo youon…");
  for (const combo of hiraganaYouon) {
    const [b, s] = [...combo];
    hiOut[combo] = compose(await fetchStrokes(b, cache), await fetchStrokes(s, cache));
  }
  for (const combo of katakanaYouon) {
    const [b, s] = [...combo];
    kaOut[combo] = compose(await fetchStrokes(b, cache), await fetchStrokes(s, cache));
  }

  const header = `// AUTO-GENERADO por scripts/gen-strokes.mjs — NO editar a mano.
// Datos de trazos: KanjiVG © Ulrich Apel, licencia CC BY-SA 3.0
// https://kanjivg.tagaini.net  ·  Regenerar: node scripts/gen-strokes.mjs
// Viewbox de cada path: 0 0 109 109

export type StrokePaths = string[];

`;

  const body =
    `export const hiraganaStrokes: Record<string, StrokePaths> = ${JSON.stringify(hiOut, null, 0)};\n\n` +
    `export const katakanaStrokes: Record<string, StrokePaths> = ${JSON.stringify(kaOut, null, 0)};\n\n` +
    `export const allStrokes: Record<string, StrokePaths> = { ...hiraganaStrokes, ...katakanaStrokes };\n`;

  await writeFile(
    new URL("../src/data/stroke-data.ts", import.meta.url),
    header + body,
    "utf8"
  );

  const total = Object.keys(hiOut).length + Object.keys(kaOut).length;
  console.log(`\n✓ stroke-data.ts generado (${total} caracteres)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
