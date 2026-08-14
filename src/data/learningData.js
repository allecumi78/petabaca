export const skillLabels = {
  letters: "Huruf",
  sounds: "Bunyi Huruf",
  syllables: "Suku Kata",
  words: "Kata",
  sentences: "Kalimat",
  comprehension: "Pemahaman Bacaan"
};

export const beginnerPath = [
  { route: "letters", area: "letters", minSkill: 0 },
  { route: "sounds", area: "letters", minSkill: 2 },
  { route: "syllables", area: "sounds", minSkill: 2 },
  { route: "words", area: "syllables", minSkill: 3 },
  { route: "sentences", area: "words", minSkill: 3 },
  { route: "story", area: "sentences", minSkill: 3 }
];

export const beginnerLetterGroups = [
  { title: "Vokal dulu", focus: ["A", "I", "U", "E", "O"], note: "Mulai dari huruf yang bunyinya jelas dan sering muncul." },
  { title: "Huruf keluarga", focus: ["M", "P", "B", "S", "K"], note: "Dekat dengan kata awal seperti mama, papa, bola, susu, kuda." },
  { title: "Huruf mirip", focus: ["B", "D", "P", "Q", "M", "N", "U", "V"], note: "Latihan pelan untuk membedakan bentuk yang sering tertukar." }
];

export const confusingLetters = [
  { target: "B", choices: ["B", "D", "P"], hint: "B punya perut di kanan. Dengarkan /be/ seperti bola." },
  { target: "D", choices: ["D", "B", "P"], hint: "D punya lengkung besar di kanan. Mulai dari garis tegak." },
  { target: "M", choices: ["M", "N", "W"], hint: "M punya dua puncak. Ucapkan /em/ seperti mama." },
  { target: "U", choices: ["U", "V", "Y"], hint: "U melengkung seperti mangkuk. Ucapkan /u/ seperti ular." }
];

export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
  const words = {
    A: ["APEL", "🍎"], B: ["BOLA", "⚽"], C: ["CERI", "🍒"], D: ["DADU", "🎲"],
    E: ["ELANG", "🦅"], F: ["FOTO", "🖼️"], G: ["GIGI", "🦷"], H: ["HATI", "❤️"],
    I: ["IKAN", "🐟"], J: ["JERUK", "🍊"], K: ["KUDA", "🐴"], L: ["LILIN", "🕯️"],
    M: ["MAMA", "👩"], N: ["NASI", "🍚"], O: ["OBAT", "💊"], P: ["PAPA", "👨"],
    Q: ["QUR'AN", "📖"], R: ["ROTI", "🍞"], S: ["SAPI", "🐄"], T: ["TOPI", "🧢"],
    U: ["ULAR", "🐍"], V: ["VAS", "🏺"], W: ["WAJAN", "🍳"], X: ["XILOFON", "🎼"],
    Y: ["YOYO", "🪀"], Z: ["ZEBRA", "🦓"]
  };
  return { letter, lower: letter.toLowerCase(), word: words[letter][0], image: words[letter][1], sound: letter };
});

const consonants = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const vowels = ["A", "I", "U", "E", "O"];

export const syllables = consonants.flatMap((consonant) => vowels.map((vowel) => `${consonant}${vowel}`));
export const syllableFamilies = consonants.map((consonant) => vowels.map((vowel) => `${consonant}${vowel}`).join(" "));

export const beginnerSyllables = ["MA", "MI", "MU", "PA", "PI", "PU", "BA", "BI", "BU", "SA", "SI", "SU", "KA", "KI", "KU"];

export const words = [
  { word: "MAMA", parts: ["MA", "MA"], image: "👩", meaning: "ibu" },
  { word: "PAPA", parts: ["PA", "PA"], image: "👨", meaning: "ayah" },
  { word: "BOLA", parts: ["BO", "LA"], image: "⚽", meaning: "bola" },
  { word: "BUKU", parts: ["BU", "KU"], image: "📕", meaning: "buku" },
  { word: "SAPI", parts: ["SA", "PI"], image: "🐄", meaning: "sapi" },
  { word: "KUDA", parts: ["KU", "DA"], image: "🐴", meaning: "kuda" },
  { word: "MATA", parts: ["MA", "TA"], image: "👁️", meaning: "mata" },
  { word: "ROTI", parts: ["RO", "TI"], image: "🍞", meaning: "roti" },
  { word: "BUDI", parts: ["BU", "DI"], image: "👦", meaning: "Budi" },
  { word: "SUSU", parts: ["SU", "SU"], image: "🥛", meaning: "susu" },
  { word: "MEJA", parts: ["ME", "JA"], image: "<span class=\"table-icon\" aria-label=\"meja\"></span>", meaning: "meja" },
  { word: "TOPI", parts: ["TO", "PI"], image: "🧢", meaning: "topi" },
  { word: "KAKI", parts: ["KA", "KI"], image: "🦶", meaning: "kaki" },
  { word: "GIGI", parts: ["GI", "GI"], image: "🦷", meaning: "gigi" },
  { word: "KOPI", parts: ["KO", "PI"], image: "☕", meaning: "kopi" },
  { word: "NASI", parts: ["NA", "SI"], image: "🍚", meaning: "nasi" },
  { word: "RODA", parts: ["RO", "DA"], image: "🛞", meaning: "roda" },
  { word: "FOTO", parts: ["FO", "TO"], image: "🖼️", meaning: "foto" },
  { word: "DADU", parts: ["DA", "DU"], image: "🎲", meaning: "dadu" },
  { word: "JARI", parts: ["JA", "RI"], image: "☝️", meaning: "jari" },
  { word: "CERI", parts: ["CE", "RI"], image: "🍒", meaning: "ceri" },
  { word: "GULA", parts: ["GU", "LA"], image: "🍬", meaning: "gula" }
];

export const sentences = [
  { text: "Budi makan nasi.", question: "Siapa yang makan nasi?", choices: ["Budi", "Siti", "Ayah"], answer: "Budi" },
  { text: "Siti minum susu.", question: "Apa yang diminum Siti?", choices: ["Susu", "Bola", "Roti"], answer: "Susu" },
  { text: "Ibu membaca buku.", question: "Apa yang dibaca Ibu?", choices: ["Buku", "Topi", "Nasi"], answer: "Buku" },
  { text: "Ayah membawa bola.", question: "Apa yang dibawa Ayah?", choices: ["Bola", "Sapi", "Apel"], answer: "Bola" }
];

export const stories = [
  {
    title: "Mimi dan Bola",
    image: "🐱⚽",
    parts: ["Mimi punya bola.", "Bola Mimi berwarna biru.", "Mimi bermain bola di taman.", "Mimi merasa senang."],
    questions: [
      { q: "Apa yang dimainkan Mimi?", choices: ["⚽ Bola", "🍎 Apel", "📕 Buku"], answer: "⚽ Bola" },
      { q: "Di mana Mimi bermain?", choices: ["Taman", "Kelas", "Dapur"], answer: "Taman" },
      { q: "Bagaimana perasaan Mimi?", choices: ["Senang", "Marah", "Takut"], answer: "Senang" }
    ]
  },
  {
    title: "Dina dan Kaki",
    image: "👧🦶",
    parts: ["Dina cuci kaki.", "Kaki Dina bersih.", "Dina memakai sepatu.", "Dina pergi ke sekolah."],
    questions: [
      { q: "Apa yang dicuci Dina?", choices: ["Kaki", "Gigi", "Buku"], answer: "Kaki" },
      { q: "Bagaimana kaki Dina?", choices: ["Bersih", "Kotor", "Basah"], answer: "Bersih" },
      { q: "Ke mana Dina pergi?", choices: ["Sekolah", "Taman", "Dapur"], answer: "Sekolah" }
    ]
  },
  {
    title: "Raka Makan Nasi",
    image: "👦🍚",
    parts: ["Raka makan nasi.", "Ibu memberi sayur.", "Raka makan pelan.", "Raka merasa kenyang."],
    questions: [
      { q: "Apa yang dimakan Raka?", choices: ["Nasi", "Bola", "Topi"], answer: "Nasi" },
      { q: "Siapa yang memberi sayur?", choices: ["Ibu", "Ayah", "Dina"], answer: "Ibu" },
      { q: "Bagaimana perasaan Raka?", choices: ["Kenyang", "Takut", "Marah"], answer: "Kenyang" }
    ]
  }
];

export const story = stories[0];

export const badges = [
  ["letters", "🏅 Jago Huruf"], ["sounds", "🏅 Peka Bunyi"], ["syllables", "🏅 Master Suku Kata"], ["words", "🏅 Pemburu Kata"],
  ["sentences", "🏅 Penjelajah Kalimat"], ["comprehension", "🏆 Bintang Membaca"]
];




