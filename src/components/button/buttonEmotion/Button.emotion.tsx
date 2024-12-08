import { type ComponentPropsWithRef } from "react";

import * as styles from "./button.emotion.style";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "normal" | "plain";
}

const Button = ({
  size = "medium",
  variant = "normal",
  type = "button",
  ref,
  children,
  css,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type={type}
      css={[
        styles.getSizeStyling(size, variant),
        styles.getVariantStyling(variant),
        styles.buttonStyling,
        css,
      ]}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
