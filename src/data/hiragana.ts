import { hiraganaStrokes } from "./stroke-data";

export type KanaType = "basic" | "dakuten" | "handakuten" | "youon";

export interface KanaEntry {
  id: string;
  kana: string;
  romaji: string;
  romajiAlts: string[];
  row: string;
  col: string;
  type: KanaType;
  strokes: string[];
  baseKana?: string;
}

const s = hiraganaStrokes;

const basic: KanaEntry[] = [
  // あ行
  { id: "hi-a",   kana: "あ", romaji: "a",   romajiAlts: [],         row: "a",  col: "a",  type: "basic", strokes: s["あ"] ?? [] },
  { id: "hi-i",   kana: "い", romaji: "i",   romajiAlts: [],         row: "a",  col: "i",  type: "basic", strokes: s["い"] ?? [] },
  { id: "hi-u",   kana: "う", romaji: "u",   romajiAlts: ["wu"],     row: "a",  col: "u",  type: "basic", strokes: s["う"] ?? [] },
  { id: "hi-e",   kana: "え", romaji: "e",   romajiAlts: [],         row: "a",  col: "e",  type: "basic", strokes: s["え"] ?? [] },
  { id: "hi-o",   kana: "お", romaji: "o",   romajiAlts: [],         row: "a",  col: "o",  type: "basic", strokes: s["お"] ?? [] },
  // か行
  { id: "hi-ka",  kana: "か", romaji: "ka",  romajiAlts: [],         row: "ka", col: "a",  type: "basic", strokes: s["か"] ?? [] },
  { id: "hi-ki",  kana: "き", romaji: "ki",  romajiAlts: [],         row: "ka", col: "i",  type: "basic", strokes: s["き"] ?? [] },
  { id: "hi-ku",  kana: "く", romaji: "ku",  romajiAlts: ["cu"],     row: "ka", col: "u",  type: "basic", strokes: s["く"] ?? [] },
  { id: "hi-ke",  kana: "け", romaji: "ke",  romajiAlts: [],         row: "ka", col: "e",  type: "basic", strokes: s["け"] ?? [] },
  { id: "hi-ko",  kana: "こ", romaji: "ko",  romajiAlts: ["co"],     row: "ka", col: "o",  type: "basic", strokes: s["こ"] ?? [] },
  // さ行
  { id: "hi-sa",  kana: "さ", romaji: "sa",  romajiAlts: [],         row: "sa", col: "a",  type: "basic", strokes: s["さ"] ?? [] },
  { id: "hi-si",  kana: "し", romaji: "shi", romajiAlts: ["si","ci"],row: "sa", col: "i",  type: "basic", strokes: s["し"] ?? [] },
  { id: "hi-su",  kana: "す", romaji: "su",  romajiAlts: [],         row: "sa", col: "u",  type: "basic", strokes: s["す"] ?? [] },
  { id: "hi-se",  kana: "せ", romaji: "se",  romajiAlts: [],         row: "sa", col: "e",  type: "basic", strokes: s["せ"] ?? [] },
  { id: "hi-so",  kana: "そ", romaji: "so",  romajiAlts: [],         row: "sa", col: "o",  type: "basic", strokes: s["そ"] ?? [] },
  // た行
  { id: "hi-ta",  kana: "た", romaji: "ta",  romajiAlts: [],         row: "ta", col: "a",  type: "basic", strokes: s["た"] ?? [] },
  { id: "hi-ti",  kana: "ち", romaji: "chi", romajiAlts: ["ti"],     row: "ta", col: "i",  type: "basic", strokes: s["ち"] ?? [] },
  { id: "hi-tu",  kana: "つ", romaji: "tsu", romajiAlts: ["tu"],     row: "ta", col: "u",  type: "basic", strokes: s["つ"] ?? [] },
  { id: "hi-te",  kana: "て", romaji: "te",  romajiAlts: [],         row: "ta", col: "e",  type: "basic", strokes: s["て"] ?? [] },
  { id: "hi-to",  kana: "と", romaji: "to",  romajiAlts: [],         row: "ta", col: "o",  type: "basic", strokes: s["と"] ?? [] },
  // な行
  { id: "hi-na",  kana: "な", romaji: "na",  romajiAlts: [],         row: "na", col: "a",  type: "basic", strokes: s["な"] ?? [] },
  { id: "hi-ni",  kana: "に", romaji: "ni",  romajiAlts: [],         row: "na", col: "i",  type: "basic", strokes: s["に"] ?? [] },
  { id: "hi-nu",  kana: "ぬ", romaji: "nu",  romajiAlts: [],         row: "na", col: "u",  type: "basic", strokes: s["ぬ"] ?? [] },
  { id: "hi-ne",  kana: "ね", romaji: "ne",  romajiAlts: [],         row: "na", col: "e",  type: "basic", strokes: s["ね"] ?? [] },
  { id: "hi-no",  kana: "の", romaji: "no",  romajiAlts: [],         row: "na", col: "o",  type: "basic", strokes: s["の"] ?? [] },
  // は行
  { id: "hi-ha",  kana: "は", romaji: "ha",  romajiAlts: [],         row: "ha", col: "a",  type: "basic", strokes: s["は"] ?? [] },
  { id: "hi-hi",  kana: "ひ", romaji: "hi",  romajiAlts: [],         row: "ha", col: "i",  type: "basic", strokes: s["ひ"] ?? [] },
  { id: "hi-fu",  kana: "ふ", romaji: "fu",  romajiAlts: ["hu"],     row: "ha", col: "u",  type: "basic", strokes: s["ふ"] ?? [] },
  { id: "hi-he",  kana: "へ", romaji: "he",  romajiAlts: [],         row: "ha", col: "e",  type: "basic", strokes: s["へ"] ?? [] },
  { id: "hi-ho",  kana: "ほ", romaji: "ho",  romajiAlts: [],         row: "ha", col: "o",  type: "basic", strokes: s["ほ"] ?? [] },
  // ま行
  { id: "hi-ma",  kana: "ま", romaji: "ma",  romajiAlts: [],         row: "ma", col: "a",  type: "basic", strokes: s["ま"] ?? [] },
  { id: "hi-mi",  kana: "み", romaji: "mi",  romajiAlts: [],         row: "ma", col: "i",  type: "basic", strokes: s["み"] ?? [] },
  { id: "hi-mu",  kana: "む", romaji: "mu",  romajiAlts: [],         row: "ma", col: "u",  type: "basic", strokes: s["む"] ?? [] },
  { id: "hi-me",  kana: "め", romaji: "me",  romajiAlts: [],         row: "ma", col: "e",  type: "basic", strokes: s["め"] ?? [] },
  { id: "hi-mo",  kana: "も", romaji: "mo",  romajiAlts: [],         row: "ma", col: "o",  type: "basic", strokes: s["も"] ?? [] },
  // や行
  { id: "hi-ya",  kana: "や", romaji: "ya",  romajiAlts: [],         row: "ya", col: "a",  type: "basic", strokes: s["や"] ?? [] },
  { id: "hi-yu",  kana: "ゆ", romaji: "yu",  romajiAlts: [],         row: "ya", col: "u",  type: "basic", strokes: s["ゆ"] ?? [] },
  { id: "hi-yo",  kana: "よ", romaji: "yo",  romajiAlts: [],         row: "ya", col: "o",  type: "basic", strokes: s["よ"] ?? [] },
  // ら行
  { id: "hi-ra",  kana: "ら", romaji: "ra",  romajiAlts: [],         row: "ra", col: "a",  type: "basic", strokes: s["ら"] ?? [] },
  { id: "hi-ri",  kana: "り", romaji: "ri",  romajiAlts: [],         row: "ra", col: "i",  type: "basic", strokes: s["り"] ?? [] },
  { id: "hi-ru",  kana: "る", romaji: "ru",  romajiAlts: [],         row: "ra", col: "u",  type: "basic", strokes: s["る"] ?? [] },
  { id: "hi-re",  kana: "れ", romaji: "re",  romajiAlts: [],         row: "ra", col: "e",  type: "basic", strokes: s["れ"] ?? [] },
  { id: "hi-ro",  kana: "ろ", romaji: "ro",  romajiAlts: [],         row: "ra", col: "o",  type: "basic", strokes: s["ろ"] ?? [] },
  // わ行
  { id: "hi-wa",  kana: "わ", romaji: "wa",  romajiAlts: [],         row: "wa", col: "a",  type: "basic", strokes: s["わ"] ?? [] },
  { id: "hi-wo",  kana: "を", romaji: "wo",  romajiAlts: ["o"],      row: "wa", col: "o",  type: "basic", strokes: s["を"] ?? [] },
  // ん
  { id: "hi-n",   kana: "ん", romaji: "n",   romajiAlts: ["nn","m"], row: "n",  col: "n",  type: "basic", strokes: s["ん"] ?? [] },
];

const dakuten: KanaEntry[] = [
  // が行
  { id: "hi-ga", kana: "が", romaji: "ga", romajiAlts: [], row: "ga", col: "a", type: "dakuten", strokes: s["が"] ?? [], baseKana: "か" },
  { id: "hi-gi", kana: "ぎ", romaji: "gi", romajiAlts: [], row: "ga", col: "i", type: "dakuten", strokes: s["ぎ"] ?? [], baseKana: "き" },
  { id: "hi-gu", kana: "ぐ", romaji: "gu", romajiAlts: [], row: "ga", col: "u", type: "dakuten", strokes: s["ぐ"] ?? [], baseKana: "く" },
  { id: "hi-ge", kana: "げ", romaji: "ge", romajiAlts: [], row: "ga", col: "e", type: "dakuten", strokes: s["げ"] ?? [], baseKana: "け" },
  { id: "hi-go", kana: "ご", romaji: "go", romajiAlts: [], row: "ga", col: "o", type: "dakuten", strokes: s["ご"] ?? [], baseKana: "こ" },
  // ざ行
  { id: "hi-za", kana: "ざ", romaji: "za", romajiAlts: [], row: "za", col: "a", type: "dakuten", strokes: s["ざ"] ?? [], baseKana: "さ" },
  { id: "hi-ji", kana: "じ", romaji: "ji", romajiAlts: ["zi"], row: "za", col: "i", type: "dakuten", strokes: s["じ"] ?? [], baseKana: "し" },
  { id: "hi-zu", kana: "ず", romaji: "zu", romajiAlts: [], row: "za", col: "u", type: "dakuten", strokes: s["ず"] ?? [], baseKana: "す" },
  { id: "hi-ze", kana: "ぜ", romaji: "ze", romajiAlts: [], row: "za", col: "e", type: "dakuten", strokes: s["ぜ"] ?? [], baseKana: "せ" },
  { id: "hi-zo", kana: "ぞ", romaji: "zo", romajiAlts: [], row: "za", col: "o", type: "dakuten", strokes: s["ぞ"] ?? [], baseKana: "そ" },
  // だ行
  { id: "hi-da",  kana: "だ", romaji: "da",  romajiAlts: [],     row: "da", col: "a", type: "dakuten", strokes: s["だ"] ?? [], baseKana: "た" },
  { id: "hi-di",  kana: "ぢ", romaji: "di",  romajiAlts: ["ji"], row: "da", col: "i", type: "dakuten", strokes: s["ぢ"] ?? [], baseKana: "ち" },
  { id: "hi-du",  kana: "づ", romaji: "du",  romajiAlts: ["zu"], row: "da", col: "u", type: "dakuten", strokes: s["づ"] ?? [], baseKana: "つ" },
  { id: "hi-de",  kana: "で", romaji: "de",  romajiAlts: [],     row: "da", col: "e", type: "dakuten", strokes: s["で"] ?? [], baseKana: "て" },
  { id: "hi-do",  kana: "ど", romaji: "do",  romajiAlts: [],     row: "da", col: "o", type: "dakuten", strokes: s["ど"] ?? [], baseKana: "と" },
  // ば行
  { id: "hi-ba", kana: "ば", romaji: "ba", romajiAlts: [], row: "ba", col: "a", type: "dakuten", strokes: s["ば"] ?? [], baseKana: "は" },
  { id: "hi-bi", kana: "び", romaji: "bi", romajiAlts: [], row: "ba", col: "i", type: "dakuten", strokes: s["び"] ?? [], baseKana: "ひ" },
  { id: "hi-bu", kana: "ぶ", romaji: "bu", romajiAlts: [], row: "ba", col: "u", type: "dakuten", strokes: s["ぶ"] ?? [], baseKana: "ふ" },
  { id: "hi-be", kana: "べ", romaji: "be", romajiAlts: [], row: "ba", col: "e", type: "dakuten", strokes: s["べ"] ?? [], baseKana: "へ" },
  { id: "hi-bo", kana: "ぼ", romaji: "bo", romajiAlts: [], row: "ba", col: "o", type: "dakuten", strokes: s["ぼ"] ?? [], baseKana: "ほ" },
];

const handakuten: KanaEntry[] = [
  { id: "hi-pa", kana: "ぱ", romaji: "pa", romajiAlts: [], row: "pa", col: "a", type: "handakuten", strokes: s["ぱ"] ?? [], baseKana: "は" },
  { id: "hi-pi", kana: "ぴ", romaji: "pi", romajiAlts: [], row: "pa", col: "i", type: "handakuten", strokes: s["ぴ"] ?? [], baseKana: "ひ" },
  { id: "hi-pu", kana: "ぷ", romaji: "pu", romajiAlts: [], row: "pa", col: "u", type: "handakuten", strokes: s["ぷ"] ?? [], baseKana: "ふ" },
  { id: "hi-pe", kana: "ぺ", romaji: "pe", romajiAlts: [], row: "pa", col: "e", type: "handakuten", strokes: s["ぺ"] ?? [], baseKana: "へ" },
  { id: "hi-po", kana: "ぽ", romaji: "po", romajiAlts: [], row: "pa", col: "o", type: "handakuten", strokes: s["ぽ"] ?? [], baseKana: "ほ" },
];

const youon: KanaEntry[] = [
  // き+small
  { id: "hi-kya", kana: "きゃ", romaji: "kya", romajiAlts: [], row: "ka", col: "ya", type: "youon", strokes: s["きゃ"] ?? [] },
  { id: "hi-kyu", kana: "きゅ", romaji: "kyu", romajiAlts: [], row: "ka", col: "yu", type: "youon", strokes: s["きゅ"] ?? [] },
  { id: "hi-kyo", kana: "きょ", romaji: "kyo", romajiAlts: [], row: "ka", col: "yo", type: "youon", strokes: s["きょ"] ?? [] },
  // し+small
  { id: "hi-sha", kana: "しゃ", romaji: "sha", romajiAlts: ["sya"], row: "sa", col: "ya", type: "youon", strokes: [] },
  { id: "hi-shu", kana: "しゅ", romaji: "shu", romajiAlts: ["syu"], row: "sa", col: "yu", type: "youon", strokes: [] },
  { id: "hi-sho", kana: "しょ", romaji: "sho", romajiAlts: ["syo"], row: "sa", col: "yo", type: "youon", strokes: [] },
  // ち+small
  { id: "hi-cha", kana: "ちゃ", romaji: "cha", romajiAlts: ["tya"], row: "ta", col: "ya", type: "youon", strokes: [] },
  { id: "hi-chu", kana: "ちゅ", romaji: "chu", romajiAlts: ["tyu"], row: "ta", col: "yu", type: "youon", strokes: [] },
  { id: "hi-cho", kana: "ちょ", romaji: "cho", romajiAlts: ["tyo"], row: "ta", col: "yo", type: "youon", strokes: [] },
  // に+small
  { id: "hi-nya", kana: "にゃ", romaji: "nya", romajiAlts: [], row: "na", col: "ya", type: "youon", strokes: [] },
  { id: "hi-nyu", kana: "にゅ", romaji: "nyu", romajiAlts: [], row: "na", col: "yu", type: "youon", strokes: [] },
  { id: "hi-nyo", kana: "にょ", romaji: "nyo", romajiAlts: [], row: "na", col: "yo", type: "youon", strokes: [] },
  // ひ+small
  { id: "hi-hya", kana: "ひゃ", romaji: "hya", romajiAlts: [], row: "ha", col: "ya", type: "youon", strokes: [] },
  { id: "hi-hyu", kana: "ひゅ", romaji: "hyu", romajiAlts: [], row: "ha", col: "yu", type: "youon", strokes: [] },
  { id: "hi-hyo", kana: "ひょ", romaji: "hyo", romajiAlts: [], row: "ha", col: "yo", type: "youon", strokes: [] },
  // み+small
  { id: "hi-mya", kana: "みゃ", romaji: "mya", romajiAlts: [], row: "ma", col: "ya", type: "youon", strokes: [] },
  { id: "hi-myu", kana: "みゅ", romaji: "myu", romajiAlts: [], row: "ma", col: "yu", type: "youon", strokes: [] },
  { id: "hi-myo", kana: "みょ", romaji: "myo", romajiAlts: [], row: "ma", col: "yo", type: "youon", strokes: [] },
  // り+small
  { id: "hi-rya", kana: "りゃ", romaji: "rya", romajiAlts: [], row: "ra", col: "ya", type: "youon", strokes: [] },
  { id: "hi-ryu", kana: "りゅ", romaji: "ryu", romajiAlts: [], row: "ra", col: "yu", type: "youon", strokes: [] },
  { id: "hi-ryo", kana: "りょ", romaji: "ryo", romajiAlts: [], row: "ra", col: "yo", type: "youon", strokes: [] },
  // ぎ+small
  { id: "hi-gya", kana: "ぎゃ", romaji: "gya", romajiAlts: [], row: "ga", col: "ya", type: "youon", strokes: [] },
  { id: "hi-gyu", kana: "ぎゅ", romaji: "gyu", romajiAlts: [], row: "ga", col: "yu", type: "youon", strokes: [] },
  { id: "hi-gyo", kana: "ぎょ", romaji: "gyo", romajiAlts: [], row: "ga", col: "yo", type: "youon", strokes: [] },
  // じ+small
  { id: "hi-ja",  kana: "じゃ", romaji: "ja",  romajiAlts: ["jya","zya"], row: "za", col: "ya", type: "youon", strokes: [] },
  { id: "hi-ju",  kana: "じゅ", romaji: "ju",  romajiAlts: ["jyu","zyu"], row: "za", col: "yu", type: "youon", strokes: [] },
  { id: "hi-jo",  kana: "じょ", romaji: "jo",  romajiAlts: ["jyo","zyo"], row: "za", col: "yo", type: "youon", strokes: [] },
  // び+small
  { id: "hi-bya", kana: "びゃ", romaji: "bya", romajiAlts: [], row: "ba", col: "ya", type: "youon", strokes: [] },
  { id: "hi-byu", kana: "びゅ", romaji: "byu", romajiAlts: [], row: "ba", col: "yu", type: "youon", strokes: [] },
  { id: "hi-byo", kana: "びょ", romaji: "byo", romajiAlts: [], row: "ba", col: "yo", type: "youon", strokes: [] },
  // ぴ+small
  { id: "hi-pya", kana: "ぴゃ", romaji: "pya", romajiAlts: [], row: "pa", col: "ya", type: "youon", strokes: [] },
  { id: "hi-pyu", kana: "ぴゅ", romaji: "pyu", romajiAlts: [], row: "pa", col: "yu", type: "youon", strokes: [] },
  { id: "hi-pyo", kana: "ぴょ", romaji: "pyo", romajiAlts: [], row: "pa", col: "yo", type: "youon", strokes: [] },
];

export const hiragana: KanaEntry[] = [...basic, ...dakuten, ...handakuten, ...youon];

export const hiraganaRows = [
  { id: "a",  label: "あ行", kana: "あいうえお" },
  { id: "ka", label: "か行", kana: "かきくけこ" },
  { id: "sa", label: "さ行", kana: "さしすせそ" },
  { id: "ta", label: "た行", kana: "たちつてと" },
  { id: "na", label: "な行", kana: "なにぬねの" },
  { id: "ha", label: "は行", kana: "はひふへほ" },
  { id: "ma", label: "ま行", kana: "まみむめも" },
  { id: "ya", label: "や行", kana: "やゆよ" },
  { id: "ra", label: "ら行", kana: "らりるれろ" },
  { id: "wa", label: "わ行", kana: "わをん" },
];
