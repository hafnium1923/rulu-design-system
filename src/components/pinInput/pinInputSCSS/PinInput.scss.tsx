import React, { useEffect, useRef, useState } from "react";
import * as styles from "./pin-input.module.scss";

interface PinInputProps {
  length: number;
  mask?: boolean;
  size?: "sm" | "md" | "lg";
  isError?: boolean;
  onlyNumber: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  errorText?: string;
  defaultValue?: string | number;
  placeholder?: string;
  borderColor?: string;
  textColor?: string;
  onValueChange?: (value: string) => void;
  onValueComplete?: (value: string) => void;
}

// 유니코드 기반 한글 조합 로직
const combineHangul = (base: string, char: string): string => {
  if (base === "") {
    return char; // base가 비어있다면 char 반환
  }

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

  const decomposedBase = decomposeHangul(base);
  // 1. 기존 값이 한글이 아니면 그대로 붙임
  if (!decomposedBase) {
    if (INITIAL_CONSONANTS.includes(base) && MEDIAL_VOWELS.includes(char)) {
      return composeHangul(base, char); // 초성과 중성 조합
    }
    return base + char;
  }
  const [initial, medial, final] = decomposedBase;

  if (final && MEDIAL_VOWELS.includes(char)) {
    // 종성이 있고 새 중성이 들어오면 종성을 떼어내고 새 조합
    const newBase = composeHangul(initial, char); // 초성 + 새 중성
    const overflow = composeHangul(final, char); // 종성 + 새 중성
    return newBase + overflow; // "나" + "다" 형식 반환
  }

  if (!final && MEDIAL_VOWELS.includes(char)) {
    // 중성을 추가
    console.log("중성추가");
    return composeHangul(initial, medial, char);
  }
  if (final && FINAL_CONSONANTS.includes(char)) {
    // 종성이 이미 있을 경우 새 글자를 생성하도록 반환
    console.log("종성 있슴!");
    return base + char;
  }
  if (FINAL_CONSONANTS.includes(char)) {
    // 종성을 추가
    return composeHangul(initial, medial, char);
  }

  return base + char; // 조합이 불가능한 경우 단순히 이어 붙임
};

const PinInput: React.FC<PinInputProps> = ({
  length,
  mask = false,
  size = "md",
  isError = false,
  onlyNumber = true,
  autoFocus = false,
  disabled = false,
  errorText,
  defaultValue,
  placeholder,
  borderColor,
  textColor,
  onValueChange,
  onValueComplete,
}) => {
  const [pins, setPins] = useState(
    Array.from(
      { length: length ?? 4 },
      (_, index) => defaultValue?.toString()[index] ?? ""
    )
  );
  const [isComposing, setIsComposing] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentChar, setCurrentChar] = useState("");

  useEffect(() => {
    if (autoFocus && refs.current[0]) {
      refs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const value = pins.join("");
    onValueChange?.(value);
    if (pins.every((pin) => pin !== "")) {
      onValueComplete?.(value);
    }
  }, [pins, onValueChange, onValueComplete]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    const lastChar = value.slice(-1);

    if (onlyNumber && !/^\d$/.test(lastChar)) return;
    if (value === "") return;

    if (/^[ㄱ-ㅎㅏ-ㅣ가-힣]$/.test(lastChar)) {
      // 한글 입력 처리
      const combined = combineHangul(pins[index], lastChar);
      console.log(
        "v: " +
          value +
          " c: " +
          combined +
          " p: " +
          pins[index] +
          " l: " +
          lastChar
      );

      if (value.length === 1 && combined.length > 1) {
        setPins((prev) => {
          const updatedPins = [...prev];
          updatedPins[index] = value;
          return updatedPins;
        });
      } else {
        setPins((prev) => {
          const updatedPins = [...prev];

          if (combined.length > 1) {
            // 넘치는 글자를 다음 칸으로 이동
            const [currentChar, overflowChar] = [
              combined.slice(0, 1),
              combined.slice(1),
            ];
            updatedPins[index] = currentChar;

            if (index < length - 1) {
              updatedPins[index + 1] =
                overflowChar + (updatedPins[index + 1] || "");
            }
            refs.current[index + 1]?.focus();
          } else {
            // 한 글자인 경우 현재 칸에 저장
            updatedPins[index] = combined;
          }

          return updatedPins;
        });
      }
    } else {
      // 숫자 또는 일반 문자 처리
      setPins((prev) => {
        const updatedPins = [...prev];
        updatedPins[index] = lastChar;
        return updatedPins;
      });

      if (index < length - 1) {
        refs.current[index + 1]?.focus();
        console.log("엥?");
      }
    }
  };

  const handleKeyboard = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    switch (e.key) {
      case "Backspace":
      case "Delete":
        if (pins[index] === "") {
          if (index > 0) {
            refs.current[index - 1]?.focus();
            console.log("f?");
          }
          console.log("in");
          break;
        } else {
          setPins((prev) => {
            prev[index] = "";
            return [...prev];
          });
          break;
        }
      case "ArrowLeft":
        if (index > 0) {
          refs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < pins.length - 1) {
          refs.current[index + 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");

    const numbers = onlyNumber ? paste.match(/[0-9]/g) : paste.split("");
    if (!numbers) return;

    const updatePins = pins.map((_, index) =>
      index < numbers.length ? numbers[index] : ""
    );

    setPins(updatePins);

    if (numbers.length < pins.length) {
      refs.current[numbers.length]?.focus();
    } else {
      refs.current[pins.length - 1]?.focus();
      onValueComplete?.(numbers.slice(0, pins.length).join(""));
    }
  };

  return (
    <div className={styles["pins-container"]} data-size={size}>
      <label className={styles["pins-container"]}>
        {pins.map((pin, index) => (
          <input
            key={index}
            ref={(ref) => (refs.current[index] = ref)}
            type={mask ? "password" : "text"}
            value={String(pin) ?? ""}
            placeholder={placeholder}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyboard(e, index)}
            disabled={disabled}
            className={isError ? styles.error : ""}
            style={
              {
                "--border-color": isError ? "var(--color-error)" : borderColor,
                "--text-color": textColor,
              } as React.CSSProperties
            }
          />
        ))}
      </label>
      {isError && errorText && <p style={{ color: "red" }}>{errorText}</p>}
    </div>
  );
};

export default PinInput;
