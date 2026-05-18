import type { KanaEntry, KanaType } from "./hiragana";
import { katakanaStrokes } from "./stroke-data";

export type { KanaEntry, KanaType };

const s = katakanaStrokes;

const basic: KanaEntry[] = [
  // ア行
  { id: "ka-a",  kana: "ア", romaji: "a",   romajiAlts: [],          row: "a",  col: "a",  type: "basic", strokes: s["ア"] ?? [] },
  { id: "ka-i",  kana: "イ", romaji: "i",   romajiAlts: [],          row: "a",  col: "i",  type: "basic", strokes: s["イ"] ?? [] },
  { id: "ka-u",  kana: "ウ", romaji: "u",   romajiAlts: ["wu"],      row: "a",  col: "u",  type: "basic", strokes: s["ウ"] ?? [] },
  { id: "ka-e",  kana: "エ", romaji: "e",   romajiAlts: [],          row: "a",  col: "e",  type: "basic", strokes: s["エ"] ?? [] },
  { id: "ka-o",  kana: "オ", romaji: "o",   romajiAlts: [],          row: "a",  col: "o",  type: "basic", strokes: s["オ"] ?? [] },
  // カ行
  { id: "ka-ka", kana: "カ", romaji: "ka",  romajiAlts: [],          row: "ka", col: "a",  type: "basic", strokes: s["カ"] ?? [] },
  { id: "ka-ki", kana: "キ", romaji: "ki",  romajiAlts: [],          row: "ka", col: "i",  type: "basic", strokes: s["キ"] ?? [] },
  { id: "ka-ku", kana: "ク", romaji: "ku",  romajiAlts: ["cu"],      row: "ka", col: "u",  type: "basic", strokes: s["ク"] ?? [] },
  { id: "ka-ke", kana: "ケ", romaji: "ke",  romajiAlts: [],          row: "ka", col: "e",  type: "basic", strokes: s["ケ"] ?? [] },
  { id: "ka-ko", kana: "コ", romaji: "ko",  romajiAlts: ["co"],      row: "ka", col: "o",  type: "basic", strokes: s["コ"] ?? [] },
  // サ行
  { id: "ka-sa", kana: "サ", romaji: "sa",  romajiAlts: [],          row: "sa", col: "a",  type: "basic", strokes: s["サ"] ?? [] },
  { id: "ka-si", kana: "シ", romaji: "shi", romajiAlts: ["si","ci"], row: "sa", col: "i",  type: "basic", strokes: s["シ"] ?? [] },
  { id: "ka-su", kana: "ス", romaji: "su",  romajiAlts: [],          row: "sa", col: "u",  type: "basic", strokes: s["ス"] ?? [] },
  { id: "ka-se", kana: "セ", romaji: "se",  romajiAlts: [],          row: "sa", col: "e",  type: "basic", strokes: s["セ"] ?? [] },
  { id: "ka-so", kana: "ソ", romaji: "so",  romajiAlts: [],          row: "sa", col: "o",  type: "basic", strokes: s["ソ"] ?? [] },
  // タ行
  { id: "ka-ta", kana: "タ", romaji: "ta",  romajiAlts: [],          row: "ta", col: "a",  type: "basic", strokes: s["タ"] ?? [] },
  { id: "ka-ti", kana: "チ", romaji: "chi", romajiAlts: ["ti"],      row: "ta", col: "i",  type: "basic", strokes: s["チ"] ?? [] },
  { id: "ka-tu", kana: "ツ", romaji: "tsu", romajiAlts: ["tu"],      row: "ta", col: "u",  type: "basic", strokes: s["ツ"] ?? [] },
  { id: "ka-te", kana: "テ", romaji: "te",  romajiAlts: [],          row: "ta", col: "e",  type: "basic", strokes: s["テ"] ?? [] },
  { id: "ka-to", kana: "ト", romaji: "to",  romajiAlts: [],          row: "ta", col: "o",  type: "basic", strokes: s["ト"] ?? [] },
  // ナ行
  { id: "ka-na", kana: "ナ", romaji: "na",  romajiAlts: [],          row: "na", col: "a",  type: "basic", strokes: s["ナ"] ?? [] },
  { id: "ka-ni", kana: "ニ", romaji: "ni",  romajiAlts: [],          row: "na", col: "i",  type: "basic", strokes: s["ニ"] ?? [] },
  { id: "ka-nu", kana: "ヌ", romaji: "nu",  romajiAlts: [],          row: "na", col: "u",  type: "basic", strokes: s["ヌ"] ?? [] },
  { id: "ka-ne", kana: "ネ", romaji: "ne",  romajiAlts: [],          row: "na", col: "e",  type: "basic", strokes: s["ネ"] ?? [] },
  { id: "ka-no", kana: "ノ", romaji: "no",  romajiAlts: [],          row: "na", col: "o",  type: "basic", strokes: s["ノ"] ?? [] },
  // ハ行
  { id: "ka-ha", kana: "ハ", romaji: "ha",  romajiAlts: [],          row: "ha", col: "a",  type: "basic", strokes: s["ハ"] ?? [] },
  { id: "ka-hi", kana: "ヒ", romaji: "hi",  romajiAlts: [],          row: "ha", col: "i",  type: "basic", strokes: s["ヒ"] ?? [] },
  { id: "ka-fu", kana: "フ", romaji: "fu",  romajiAlts: ["hu"],      row: "ha", col: "u",  type: "basic", strokes: s["フ"] ?? [] },
  { id: "ka-he", kana: "ヘ", romaji: "he",  romajiAlts: [],          row: "ha", col: "e",  type: "basic", strokes: s["ヘ"] ?? [] },
  { id: "ka-ho", kana: "ホ", romaji: "ho",  romajiAlts: [],          row: "ha", col: "o",  type: "basic", strokes: s["ホ"] ?? [] },
  // マ行
  { id: "ka-ma", kana: "マ", romaji: "ma",  romajiAlts: [],          row: "ma", col: "a",  type: "basic", strokes: s["マ"] ?? [] },
  { id: "ka-mi", kana: "ミ", romaji: "mi",  romajiAlts: [],          row: "ma", col: "i",  type: "basic", strokes: s["ミ"] ?? [] },
  { id: "ka-mu", kana: "ム", romaji: "mu",  romajiAlts: [],          row: "ma", col: "u",  type: "basic", strokes: s["ム"] ?? [] },
  { id: "ka-me", kana: "メ", romaji: "me",  romajiAlts: [],          row: "ma", col: "e",  type: "basic", strokes: s["メ"] ?? [] },
  { id: "ka-mo", kana: "モ", romaji: "mo",  romajiAlts: [],          row: "ma", col: "o",  type: "basic", strokes: s["モ"] ?? [] },
  // ヤ行
  { id: "ka-ya", kana: "ヤ", romaji: "ya",  romajiAlts: [],          row: "ya", col: "a",  type: "basic", strokes: s["ヤ"] ?? [] },
  { id: "ka-yu", kana: "ユ", romaji: "yu",  romajiAlts: [],          row: "ya", col: "u",  type: "basic", strokes: s["ユ"] ?? [] },
  { id: "ka-yo", kana: "ヨ", romaji: "yo",  romajiAlts: [],          row: "ya", col: "o",  type: "basic", strokes: s["ヨ"] ?? [] },
  // ラ行
  { id: "ka-ra", kana: "ラ", romaji: "ra",  romajiAlts: [],          row: "ra", col: "a",  type: "basic", strokes: s["ラ"] ?? [] },
  { id: "ka-ri", kana: "リ", romaji: "ri",  romajiAlts: [],          row: "ra", col: "i",  type: "basic", strokes: s["リ"] ?? [] },
  { id: "ka-ru", kana: "ル", romaji: "ru",  romajiAlts: [],          row: "ra", col: "u",  type: "basic", strokes: s["ル"] ?? [] },
  { id: "ka-re", kana: "レ", romaji: "re",  romajiAlts: [],          row: "ra", col: "e",  type: "basic", strokes: s["レ"] ?? [] },
  { id: "ka-ro", kana: "ロ", romaji: "ro",  romajiAlts: [],          row: "ra", col: "o",  type: "basic", strokes: s["ロ"] ?? [] },
  // ワ行
  { id: "ka-wa", kana: "ワ", romaji: "wa",  romajiAlts: [],          row: "wa", col: "a",  type: "basic", strokes: s["ワ"] ?? [] },
  { id: "ka-wo", kana: "ヲ", romaji: "wo",  romajiAlts: ["o"],       row: "wa", col: "o",  type: "basic", strokes: s["ヲ"] ?? [] },
  // ン
  { id: "ka-n",  kana: "ン", romaji: "n",   romajiAlts: ["nn","m"],  row: "n",  col: "n",  type: "basic", strokes: s["ン"] ?? [] },
];

const dakuten: KanaEntry[] = [
  // ガ行
  { id: "ka-ga", kana: "ガ", romaji: "ga", romajiAlts: [], row: "ga", col: "a", type: "dakuten", strokes: s["ガ"] ?? [], baseKana: "カ" },
  { id: "ka-gi", kana: "ギ", romaji: "gi", romajiAlts: [], row: "ga", col: "i", type: "dakuten", strokes: s["ギ"] ?? [], baseKana: "キ" },
  { id: "ka-gu", kana: "グ", romaji: "gu", romajiAlts: [], row: "ga", col: "u", type: "dakuten", strokes: s["グ"] ?? [], baseKana: "ク" },
  { id: "ka-ge", kana: "ゲ", romaji: "ge", romajiAlts: [], row: "ga", col: "e", type: "dakuten", strokes: s["ゲ"] ?? [], baseKana: "ケ" },
  { id: "ka-go", kana: "ゴ", romaji: "go", romajiAlts: [], row: "ga", col: "o", type: "dakuten", strokes: s["ゴ"] ?? [], baseKana: "コ" },
  // ザ行
  { id: "ka-za", kana: "ザ", romaji: "za", romajiAlts: [], row: "za", col: "a", type: "dakuten", strokes: s["ザ"] ?? [], baseKana: "サ" },
  { id: "ka-ji", kana: "ジ", romaji: "ji", romajiAlts: ["zi"], row: "za", col: "i", type: "dakuten", strokes: s["ジ"] ?? [], baseKana: "シ" },
  { id: "ka-zu", kana: "ズ", romaji: "zu", romajiAlts: [], row: "za", col: "u", type: "dakuten", strokes: s["ズ"] ?? [], baseKana: "ス" },
  { id: "ka-ze", kana: "ゼ", romaji: "ze", romajiAlts: [], row: "za", col: "e", type: "dakuten", strokes: s["ゼ"] ?? [], baseKana: "セ" },
  { id: "ka-zo", kana: "ゾ", romaji: "zo", romajiAlts: [], row: "za", col: "o", type: "dakuten", strokes: s["ゾ"] ?? [], baseKana: "ソ" },
  // ダ行
  { id: "ka-da",  kana: "ダ", romaji: "da",  romajiAlts: [],     row: "da", col: "a", type: "dakuten", strokes: s["ダ"] ?? [], baseKana: "タ" },
  { id: "ka-di",  kana: "ヂ", romaji: "di",  romajiAlts: ["ji"], row: "da", col: "i", type: "dakuten", strokes: s["ヂ"] ?? [], baseKana: "チ" },
  { id: "ka-du",  kana: "ヅ", romaji: "du",  romajiAlts: ["zu"], row: "da", col: "u", type: "dakuten", strokes: s["ヅ"] ?? [], baseKana: "ツ" },
  { id: "ka-de",  kana: "デ", romaji: "de",  romajiAlts: [],     row: "da", col: "e", type: "dakuten", strokes: s["デ"] ?? [], baseKana: "テ" },
  { id: "ka-do",  kana: "ド", romaji: "do",  romajiAlts: [],     row: "da", col: "o", type: "dakuten", strokes: s["ド"] ?? [], baseKana: "ト" },
  // バ行
  { id: "ka-ba", kana: "バ", romaji: "ba", romajiAlts: [], row: "ba", col: "a", type: "dakuten", strokes: s["バ"] ?? [], baseKana: "ハ" },
  { id: "ka-bi", kana: "ビ", romaji: "bi", romajiAlts: [], row: "ba", col: "i", type: "dakuten", strokes: s["ビ"] ?? [], baseKana: "ヒ" },
  { id: "ka-bu", kana: "ブ", romaji: "bu", romajiAlts: [], row: "ba", col: "u", type: "dakuten", strokes: s["ブ"] ?? [], baseKana: "フ" },
  { id: "ka-be", kana: "ベ", romaji: "be", romajiAlts: [], row: "ba", col: "e", type: "dakuten", strokes: s["ベ"] ?? [], baseKana: "ヘ" },
  { id: "ka-bo", kana: "ボ", romaji: "bo", romajiAlts: [], row: "ba", col: "o", type: "dakuten", strokes: s["ボ"] ?? [], baseKana: "ホ" },
];

const handakuten: KanaEntry[] = [
  { id: "ka-pa", kana: "パ", romaji: "pa", romajiAlts: [], row: "pa", col: "a", type: "handakuten", strokes: s["パ"] ?? [], baseKana: "ハ" },
  { id: "ka-pi", kana: "ピ", romaji: "pi", romajiAlts: [], row: "pa", col: "i", type: "handakuten", strokes: s["ピ"] ?? [], baseKana: "ヒ" },
  { id: "ka-pu", kana: "プ", romaji: "pu", romajiAlts: [], row: "pa", col: "u", type: "handakuten", strokes: s["プ"] ?? [], baseKana: "フ" },
  { id: "ka-pe", kana: "ペ", romaji: "pe", romajiAlts: [], row: "pa", col: "e", type: "handakuten", strokes: s["ペ"] ?? [], baseKana: "ヘ" },
  { id: "ka-po", kana: "ポ", romaji: "po", romajiAlts: [], row: "pa", col: "o", type: "handakuten", strokes: s["ポ"] ?? [], baseKana: "ホ" },
];

const youon: KanaEntry[] = [
  { id: "ka-kya", kana: "キャ", romaji: "kya", romajiAlts: [], row: "ka", col: "ya", type: "youon", strokes: s["キャ"] ?? [] },
  { id: "ka-kyu", kana: "キュ", romaji: "kyu", romajiAlts: [], row: "ka", col: "yu", type: "youon", strokes: s["キュ"] ?? [] },
  { id: "ka-kyo", kana: "キョ", romaji: "kyo", romajiAlts: [], row: "ka", col: "yo", type: "youon", strokes: s["キョ"] ?? [] },
  { id: "ka-sha", kana: "シャ", romaji: "sha", romajiAlts: ["sya"], row: "sa", col: "ya", type: "youon", strokes: [] },
  { id: "ka-shu", kana: "シュ", romaji: "shu", romajiAlts: ["syu"], row: "sa", col: "yu", type: "youon", strokes: [] },
  { id: "ka-sho", kana: "ショ", romaji: "sho", romajiAlts: ["syo"], row: "sa", col: "yo", type: "youon", strokes: [] },
  { id: "ka-cha", kana: "チャ", romaji: "cha", romajiAlts: ["tya"], row: "ta", col: "ya", type: "youon", strokes: [] },
  { id: "ka-chu", kana: "チュ", romaji: "chu", romajiAlts: ["tyu"], row: "ta", col: "yu", type: "youon", strokes: [] },
  { id: "ka-cho", kana: "チョ", romaji: "cho", romajiAlts: ["tyo"], row: "ta", col: "yo", type: "youon", strokes: [] },
  { id: "ka-nya", kana: "ニャ", romaji: "nya", romajiAlts: [], row: "na", col: "ya", type: "youon", strokes: [] },
  { id: "ka-nyu", kana: "ニュ", romaji: "nyu", romajiAlts: [], row: "na", col: "yu", type: "youon", strokes: [] },
  { id: "ka-nyo", kana: "ニョ", romaji: "nyo", romajiAlts: [], row: "na", col: "yo", type: "youon", strokes: [] },
  { id: "ka-hya", kana: "ヒャ", romaji: "hya", romajiAlts: [], row: "ha", col: "ya", type: "youon", strokes: [] },
  { id: "ka-hyu", kana: "ヒュ", romaji: "hyu", romajiAlts: [], row: "ha", col: "yu", type: "youon", strokes: [] },
  { id: "ka-hyo", kana: "ヒョ", romaji: "hyo", romajiAlts: [], row: "ha", col: "yo", type: "youon", strokes: [] },
  { id: "ka-mya", kana: "ミャ", romaji: "mya", romajiAlts: [], row: "ma", col: "ya", type: "youon", strokes: [] },
  { id: "ka-myu", kana: "ミュ", romaji: "myu", romajiAlts: [], row: "ma", col: "yu", type: "youon", strokes: [] },
  { id: "ka-myo", kana: "ミョ", romaji: "myo", romajiAlts: [], row: "ma", col: "yo", type: "youon", strokes: [] },
  { id: "ka-rya", kana: "リャ", romaji: "rya", romajiAlts: [], row: "ra", col: "ya", type: "youon", strokes: [] },
  { id: "ka-ryu", kana: "リュ", romaji: "ryu", romajiAlts: [], row: "ra", col: "yu", type: "youon", strokes: [] },
  { id: "ka-ryo", kana: "リョ", romaji: "ryo", romajiAlts: [], row: "ra", col: "yo", type: "youon", strokes: [] },
  { id: "ka-gya", kana: "ギャ", romaji: "gya", romajiAlts: [], row: "ga", col: "ya", type: "youon", strokes: [] },
  { id: "ka-gyu", kana: "ギュ", romaji: "gyu", romajiAlts: [], row: "ga", col: "yu", type: "youon", strokes: [] },
  { id: "ka-gyo", kana: "ギョ", romaji: "gyo", romajiAlts: [], row: "ga", col: "yo", type: "youon", strokes: [] },
  { id: "ka-ja",  kana: "ジャ", romaji: "ja",  romajiAlts: ["jya"], row: "za", col: "ya", type: "youon", strokes: [] },
  { id: "ka-ju",  kana: "ジュ", romaji: "ju",  romajiAlts: ["jyu"], row: "za", col: "yu", type: "youon", strokes: [] },
  { id: "ka-jo",  kana: "ジョ", romaji: "jo",  romajiAlts: ["jyo"], row: "za", col: "yo", type: "youon", strokes: [] },
  { id: "ka-bya", kana: "ビャ", romaji: "bya", romajiAlts: [], row: "ba", col: "ya", type: "youon", strokes: [] },
  { id: "ka-byu", kana: "ビュ", romaji: "byu", romajiAlts: [], row: "ba", col: "yu", type: "youon", strokes: [] },
  { id: "ka-byo", kana: "ビョ", romaji: "byo", romajiAlts: [], row: "ba", col: "yo", type: "youon", strokes: [] },
  { id: "ka-pya", kana: "ピャ", romaji: "pya", romajiAlts: [], row: "pa", col: "ya", type: "youon", strokes: [] },
  { id: "ka-pyu", kana: "ピュ", romaji: "pyu", romajiAlts: [], row: "pa", col: "yu", type: "youon", strokes: [] },
  { id: "ka-pyo", kana: "ピョ", romaji: "pyo", romajiAlts: [], row: "pa", col: "yo", type: "youon", strokes: [] },
];

export const katakana: KanaEntry[] = [...basic, ...dakuten, ...handakuten, ...youon];

export const katakanaRows = [
  { id: "a",  label: "ア行", kana: "アイウエオ" },
  { id: "ka", label: "カ行", kana: "カキクケコ" },
  { id: "sa", label: "サ行", kana: "サシスセソ" },
  { id: "ta", label: "タ行", kana: "タチツテト" },
  { id: "na", label: "ナ行", kana: "ナニヌネノ" },
  { id: "ha", label: "ハ行", kana: "ハヒフヘホ" },
  { id: "ma", label: "マ行", kana: "マミムメモ" },
  { id: "ya", label: "ヤ行", kana: "ヤユヨ" },
  { id: "ra", label: "ラ行", kana: "ラリルレロ" },
  { id: "wa", label: "ワ行", kana: "ワヲン" },
];
