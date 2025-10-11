
const malayalamToArabicMap = {
    // Independent vowels (സ്വരങ്ങൾ) - All 13 Malayalam vowels
    "അ": "اَ", "ആ": "اٰ", "ഇ": "اِ", "ഈ": "اِی", "ഉ": "اُ", "ഊ": "اُو",
    "ഋ": "رْ", "ൠ": "رّْ", "ഌ": "لْ", "ൡ": "لّْ",
    "എ": "ا٘", "ഏ": "ا٘ی", "ഐ": "اَی", "ഒ": "اُ", "ഓ": "اٝ", "ഔ": "اَو",

    // Consonants (വ്യഞ്ജനങ്ങൾ) - All 36 Malayalam consonants with Fath'ha

    "ക": "کَ", "ഖ": "خَ", "ഗ": "گَ", "ഘ": "گَّ", "ങ": "ۼَ",

    "ച": "چَ", "ഛ": "چَّ", "ജ": "جَ", "ഝ": "جَّ", "ഞ": "ڿَ",

    "ട": "ڊَ", "ഠ": "ٹَّ", "ഡ": "ڈَ", "ഢ": "ڈَّ", "ണ": "ڹَ",

    "ത": "تَ", "ഥ": "تَّ", "ദ": "دَ", "ധ": "دَ", "ന": "نَ",

    "പ": "پَ", "ഫ": "فَ", "ബ": "بَ", "ഭ": "بَّ", "മ": "مَ",

    "യ": "یَ", "ര": "ڔَ", "ല": "لَ", "വ": "وَ", "ശ": "شَ", "ഷ": "شَّ",
    "സ": "سَ", "ഹ": "حَ", "ള": "ۻَ", "ഴ": "ژَ", "റ": "رَ",

    // Chillaksharam (final consonants) - Consonant endings
    "ൻ": "نْ", "ർ": "رْ", "ൽ": "ل", "ൾ": "ۻْ", "ൺ": "ڹْ", "ൿ": "کَ",

    // Malayalam numerals (മലയാളം അക്കങ്ങൾ)
    "൦": "۰", "൧": "۱", "൨": "۲", "൩": "۳", "൪": "۴",
    "൫": "۵", "൬": "۶", "൭": "۷", "൮": "۸", "൯": "۹",

    // Special punctuation
    "൹": "۔", // Malayalam period
};

const vowelSigns = {
    // Dependent vowel signs (matras) - Malayalam vowel diacritics
    "ാ": "ا",    // ā (long a)
    "ി": "ِ",    // i (short i)
    "ീ": "ِي",   // ī (long i)
    "ു": "ُ",    // u (short u)
    "ൂ": "ُو",   // ū (long u)
    "ൃ": "ْر",   // ṛ (short r)
    "ൄ": "ْر",   // ṝ (long r)
    "ൢ": "ْل",   // ḷ (short l)
    "ൣ": "ْل",   // ḹ (long l)
    "െ": "٘",    // e (short e)
    "േ": "ِی",   // ē (long e)
    "ൈ": "يْ",   // ai (diphthong)
    "ൊ": "ُ",    // o (short o)
    "ോ": "ُو",   // ō (long o)
    "ൗ": "َو",   // au (diphthong)
    "്": "ْ",     // virama (consonant without vowel)
    "ം": "م",     // virama (consonant without vowel)
};

// Special clusters mapping (consonant clusters)
const specialClusters = {
    // Common consonant clusters
    "ച്ച": "چَّ",   // cca → چّ
    "ജ്ജ": "جَّ",   // jja → جج
    "ഡ്ഡ": "ڈَّ",   // dda → ڈڈ
    "ക്ക": "کَّ",   // kka → کک
    "ത്ത": "تَّ",   // tta → تت
    "ദ്ദ": "دَّ",   // dda → دد
    "പ്പ": "پّ",   // ppa → پپ
    "ബ്ബ": "بَّ",   // bba → بب
    "മ്മ": "مَّ",   // mma → مم
    "ന്ന": "نَّ",   // nna → نن
    "ല്ല": "لَّ",   // lla → لل
    "ട്ട": "ڊَّ",   // tta → ڊڊ
    "ര്ര": "رَّ",   // rra → رر
    "സ്സ": "سَّ",   // ssa → سس
    "ഹ്ഹ": "حَّ",   // hha → حح
    "ള്ള": "ۻَّ",   // lla → ۻۻ
    "ചേ": "چ٘",   // che → چ٘
    "ങ്ങ": "ۼَّ",   // nnga → ۼۼ
    "ദ്ധ": "دّھ",   // ddha → ددھ

    // Special combinations
    "സ്വ": "ص",   // sva → صو
    "ക്ഷ": "کْشَ",   // ksha → کش
    "ജ്ഞ": "جْڿَ",   // jnya → جڿ
    "ശ്ര": "شْرَ",   // shra → شر
    "സ്ര": "سْرَ",   // sra → سر
    "ഹ്ര": "حْرَ",   // hra → حر
    "സം": "سَمْ",   // sama → 
};

function isVowelSign(char) {
    return Object.prototype.hasOwnProperty.call(vowelSigns, char);
}

function transliterateToArabic(malayalamText) {
    let result = "";

    for (let i = 0; i < malayalamText.length; i++) {
        const current = malayalamText[i];
        const next = malayalamText[i + 1];
        const twoChars = malayalamText.slice(i, i + 2);
        const threeChars = malayalamText.slice(i, i + 3);

        // 🔹 1. Handle special 3-char clusters first
        if (specialClusters[threeChars]) {
            result += specialClusters[threeChars];
            i += 2;
            continue;
        }

        // 🔹 2. Handle special 2-char clusters
        if (specialClusters[twoChars]) {
            result += specialClusters[twoChars];
            i += 1;
            continue;
        }

        // 🔹 3. Handle normal consonant + vowel
        if (malayalamToArabicMap[current]) {
            let base = malayalamToArabicMap[current];
            if (next && isVowelSign(next)) {
                // Remove Fath'ha from base consonant when followed by vowel sign
                if (base.endsWith('َ')) {
                    base = base.slice(0, -1);
                }
                result += base + vowelSigns[next];
                i++;
                continue;
            }
            result += base;
            continue;
        }

        // 🔹 4. Standalone vowel signs
        if (isVowelSign(current)) {
            result += vowelSigns[current];
            continue;
        }

        // 🔹 5. Other characters (punctuation, space)
        result += current;
    }

    return result;
}

module.exports = transliterateToArabic