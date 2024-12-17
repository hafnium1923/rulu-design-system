import {
  useId,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react";

import * as styles from "./input.emotion.style";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: ReactNode;
  variant?: "outlined" | "filled" | "none";
}

/**
 * Input 컴포넌트, 기본 input의 모든 속성 사용 가능
 *
 * @param {ReactNode} label - Input 좌측 상단에 나오는 Input컴포넌트의 라벨
 * @param {"outlined" | "filled" | "none"} [variant='outline'] - Input 컴포넌트의 스타일링 방법.
 */
const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      id,
      variant = "outlined",
      type = "text",
      css,
      ...rest
    } = props;
    const labelId = id ?? useId();
    return (
      <div css={styles.containerStyle}>
        {label && (
          <label htmlFor={labelId} css={styles.labelStyle}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={labelId}
          type={type}
          css={[
            styles.defaultInputStyle,
            styles.getVariantStyling(variant),
            css,
          ]}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
