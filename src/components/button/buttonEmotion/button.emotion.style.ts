import { css } from "@emotion/react";

import { theme } from "@/styles/theme";
import { type ButtonProps } from "./Button.emotion";

export const getVariantStyling = (
  variant: Required<ButtonProps>["variant"]
) => {
  const style = {
    primary: css({
      backgroundColor: theme.color.black,

      color: theme.color.white,

      "&:hover:enabled": {
        backgroundColor: theme.color.black700,
      },

      "&:focus": {
        boxShadow: `0 0 0 3px ${theme.color.black700}`,
      },
    }),

    normal: css({
      backgroundColor: theme.color.white,

      color: theme.color.black,

      "&:hover:enabled": {
        backgroundColor: `${theme.color.gray200}`,
      },

      "&:focus": {
        boxShadow: `0 0 0 3px ${theme.color.gray200}`,
      },
    }),

    plain: css({
      backgroundColor: "transparent",

      color: theme.color.black,

      "&:focus": {
        boxShadow: `0 0 0 3px ${theme.color.gray200}`,
      },
    }),
  };

  return style[variant];
};

export const getSizeStyling = (
  size: Required<ButtonProps>["size"],
  variant: Required<ButtonProps>["variant"]
) => {
  const style = {
    large: css({
      padding: `${variant !== "plain" && "14px 16px"}`,
    }),
    medium: css({
      padding: `${variant !== "plain" && "12px 16px"}`,
    }),
    small: css({
      padding: `${variant !== "plain" && "8px 12px"}`,
    }),
  };

  return style[size];
};

export const buttonStyling = css`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  border: none;
  border-radius: 4px;

  transition: all 0.2s ease-in;

  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }
`;
