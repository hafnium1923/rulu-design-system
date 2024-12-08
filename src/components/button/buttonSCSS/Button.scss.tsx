import { type ComponentPropsWithRef } from "react";

import * as styles from "./button.module.scss";

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
      className={[
        styles.button,
        styles[`button-${variant}`],
        variant !== "plain" && styles[`button-${size}`],
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
