import { css } from "@emotion/react";

import type { InputProps } from "@/components/input/inputEmotion/Input.emotion";
import { theme } from "@/styles/theme";

export const getVariantStyling = (variant: Required<InputProps>["variant"]) => {
  const style = {
    outlined: css`
      border-radius: 9px;
      border: 1.5px solid ${theme.color.black};
    `,

    filled: css`
      border-bottom: 1.5px solid ${theme.color.black};
    `,

    none: css``,
  };

  return style[variant];
};

export const containerStyle = css`
  width: 100%;
`;
export const labelStyle = css`
  display: inline-block;
  padding: 2px 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  color: ${theme.color.black700};
`;

export const defaultInputStyle = css`
  width: 100%;
  font-size: 18px;
  padding: 0 12px;
  height: 48px;
  box-sizing: border-box;
`;
