const HANGUL_BASE = 0xac00;
const INITIAL_CONSONANTS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const MEDIAL_VOWELS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
const FINAL_CONSONANTS = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 유니코드 기반 한글 조합 로직
export const combineHangul = (base: string, char: string): string => {
  if (base === "") {
    return char; // base가 비어있다면 char 반환
  }

  const composeHangul = (
    initial: string,
    medial: string,
    final: string = ""
  ): string => {
    const initialIndex = INITIAL_CONSONANTS.indexOf(initial);
    const medialIndex = MEDIAL_VOWELS.indexOf(medial);
    const finalIndex = FINAL_CONSONANTS.indexOf(final);

    if (initialIndex === -1 || medialIndex === -1 || finalIndex === -1)
      return "";
    const code =
      HANGUL_BASE + initialIndex * 21 * 28 + medialIndex * 28 + finalIndex;
    return String.fromCharCode(code);
  };

  const decomposeHangul = (char: string): [string, string, string] | null => {
    const code = char.charCodeAt(0);
    if (code < HANGUL_BASE || code > HANGUL_BASE + 11171) return null;

    const syllableIndex = code - HANGUL_BASE;
    const initialIndex = Math.floor(syllableIndex / (21 * 28));
    const medialIndex = Math.floor((syllableIndex % (21 * 28)) / 28);
    const finalIndex = syllableIndex % 28;

    return [
      INITIAL_CONSONANTS[initialIndex],
      MEDIAL_VOWELS[medialIndex],
      FINAL_CONSONANTS[finalIndex],
    ];
  };

  const combineMedialVowels = (
    baseMedial: string,
    newMedial: string
  ): string | null => {
    const COMBINATIONS: Record<string, Record<string, string>> = {
      ㅏ: { ㅣ: "ㅐ" },
      ㅑ: { ㅣ: "ㅒ" },
      ㅓ: { ㅣ: "ㅔ" },
      ㅕ: { ㅣ: "ㅖ" },
      ㅗ: { ㅏ: "ㅘ", ㅐ: "ㅙ", ㅣ: "ㅚ" },
      ㅜ: { ㅓ: "ㅝ", ㅔ: "ㅞ", ㅣ: "ㅟ" },
      ㅡ: { ㅣ: "ㅢ" },
    };

    if (COMBINATIONS[baseMedial] && COMBINATIONS[baseMedial][newMedial]) {
      return COMBINATIONS[baseMedial][newMedial];
    }

    return null; // 합성이 불가능한 경우
  };

  const combineFinalConsonants = (
    baseFinal: string,
    newConsonant: string
  ): string | null => {
    const FINAL_CONSONANT_COMBINATIONS: Record<
      string,
      Record<string, string>
    > = {
      ㄱ: { ㅅ: "ㄳ" },
      ㄴ: { ㅈ: "ㄵ", ㅎ: "ㄶ" },
      ㄹ: {
        ㄱ: "ㄺ",
        ㅁ: "ㄻ",
        ㅂ: "ㄼ",
        ㅅ: "ㄽ",
        ㅌ: "ㄾ",
        ㅍ: "ㄿ",
        ㅎ: "ㅀ",
      },
      ㅂ: { ㅅ: "ㅄ" },
    };

    if (
      FINAL_CONSONANT_COMBINATIONS[baseFinal] &&
      FINAL_CONSONANT_COMBINATIONS[baseFinal][newConsonant]
    ) {
      return FINAL_CONSONANT_COMBINATIONS[baseFinal][newConsonant];
    }

    return null; // 합성이 불가능한 경우
  };

  const decomposedBase = decomposeHangul(base);

  // 기존 값이 한글이 아니면 그대로 붙임
  if (!decomposedBase) {
    if (INITIAL_CONSONANTS.includes(base) && MEDIAL_VOWELS.includes(char)) {
      return composeHangul(base, char); // 초성과 중성 조합
    }
    return base + char;
  }
  const [initial, medial, final] = decomposedBase;

  // 종성이 있고 새 중성이 들어오면 종성을 떼어내고 새 조합
  if (final && MEDIAL_VOWELS.includes(char)) {
    const newBase = composeHangul(initial, medial); // 초성 + 새 중성
    const overflow = composeHangul(final, char); // 종성 + 새 중성
    return newBase + overflow; // "나" + "다" 형식 반환
  }

  // 중성을 추가
  if (!final && MEDIAL_VOWELS.includes(char)) {
    const combinedMedial = combineMedialVowels(medial, char);

    if (combinedMedial) {
      return composeHangul(initial, combinedMedial, final);
    }

    return composeHangul(initial, char);
  }

  if (final && FINAL_CONSONANTS.includes(char)) {
    // 종성이 이미 있을 경우 새 글자를 생성하도록 반환
    const combinedFinal = combineFinalConsonants(final, char);

    if (combinedFinal) {
      return composeHangul(initial, medial, combinedFinal); // 기존 중성과 새로운 종성을 조합
    }

    return base + char;
  }

  if (FINAL_CONSONANTS.includes(char)) {
    // 종성을 추가
    return composeHangul(initial, medial, char);
  }

  return base + char; // 조합이 불가능한 경우 단순히 이어 붙임
};
