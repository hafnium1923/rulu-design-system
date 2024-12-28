import { CSSProperties } from "react";

import * as styles from "./pin-input.module.scss";
import { usePinInput } from "../usePinInput";

export interface PinInputProps {
  length: number;
  mask?: boolean;
  size?: "small" | "medium" | "large";
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

/**
 * PinInput Component Props
 *
 * @param {number} length - 핀 입력의 길이(필수).
 * @param {boolean} [mask=false] - 입력된 값을 마스킹 처리할지 여부.
 * @param {"small" | "medium" | "large"} [size="medium"] - 핀 입력의 크기를 설정.
 * @param {boolean} [isError=false] - 에러 상태 여부.
 * @param {boolean} onlyNumber - 입력값이 숫자만 가능하도록 제한.
 * @param {boolean} [autoFocus=false] - 컴포넌트가 로드될 때 자동으로 포커스를 받을지 여부.
 * @param {boolean} [disabled=false] - 입력 필드를 비활성화할지 여부.
 * @param {string} [errorText] - 에러 상태일 때 표시할 텍스트.
 * @param {string | number} [defaultValue] - 초기값을 설정.
 * @param {string} [placeholder] - 입력 필드의 자리 표시 텍스트.
 * @param {string} [borderColor] - 입력 필드 테두리 색상.
 * @param {string} [textColor] - 입력 필드 텍스트 색상.
 * @param {function} [onValueChange] - 입력값이 변경될 때 호출되는 콜백 함수. 변경된 값을 매개변수로 제공.
 * @param {function} [onValueComplete] - 핀 입력이 완성되었을 때 호출되는 콜백 함수. 완성된 값을 매개변수로 제공.
 */
const PinInput = ({
  mask = false,
  size = "medium",
  isError = false,
  disabled = false,
  errorText,
  placeholder,
  borderColor,
  textColor,
  ...rest
}: PinInputProps) => {
  const {
    refs,
    pins,

    handlers: { handlePaste, handleChange, handleKeyboard },
  } = usePinInput(rest);

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
              } as CSSProperties
            }
          />
        ))}
      </label>
      {isError && errorText && <p style={{ color: "red" }}>{errorText}</p>}
    </div>
  );
};

export default PinInput;
