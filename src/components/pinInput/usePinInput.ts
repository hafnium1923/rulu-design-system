import { useEffect, useRef, useState } from "react";
import type { PinInputProps } from "./pinInputSCSS/PinInput.scss";
import { combineHangul } from "./combineHangul";

export const usePinInput = ({
  length,
  autoFocus = false,
  onlyNumber = true,
  defaultValue,
  onValueChange,
  onValueComplete,
}: PinInputProps) => {
  const [pins, setPins] = useState(
    Array.from(
      { length: length ?? 4 },
      (_, index) => defaultValue?.toString()[index] ?? ""
    )
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);

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
    if (value.trim() === "") return;

    const lastChar = value.slice(-1);

    if (onlyNumber && !/^\d$/.test(lastChar)) return;

    // 한글 입력 처리
    if (/^[ㄱ-ㅎㅏ-ㅣ가-힣]$/.test(lastChar)) {
      const combined = combineHangul(pins[index], lastChar);

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
          }
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

  return {
    refs,
    pins,

    handlers: {
      handlePaste,
      handleChange,
      handleKeyboard,
    },
  };
};
