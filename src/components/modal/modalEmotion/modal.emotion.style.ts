import { css } from "@emotion/react";

import { animation, theme } from "@/styles/emotion";
import type { ModalContextProps } from "@/components/modal/ModalContext";

export const getSizeStyling = (size: Required<ModalContextProps>["size"]) => {
  const style = {
    large: css({
      width: "750px",
      padding: "30px 40px",
      borderRadius: "14px",
    }),
    medium: css({
      width: "500px",
      padding: "26px 30px",
      borderRadius: "10px",
    }),
    small: css({
      width: "260px",
      padding: "16px 20px",
      borderRadius: "8px",
    }),
    full: css({
      width: "100dvw",
      height: "100dvh",
      padding: "40px",
      borderRadius: 0,
    }),
  };

  return style[size];
};

export const getPositionStyling = (
  position: Required<ModalContextProps>["position"]
) => {
  const style = {
    center: css({
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }),
    top: css({
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
    }),
    bottom: css({
      bottom: "10%",
      left: "50%",
      transform: "translateX(-50%)",
    }),
  };

  return style[position];
};

export const container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: ${theme.zIndex.modal};

  width: 100vw;
  height: 100dvh;
`;

export const layout = css`
  button:focus-visible,
  [href]:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 3px solid var(--gray-300);
    outline-offset: 4px;
  }

  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;

  box-sizing: border-box;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  max-height: 60dvh;

  background-color: ${theme.color.white};
  color: inherit;

  opacity: 0;
  animation: ${animation.fadeIn} 0.2s ease-in 0.05s forwards;
`;

export const header = css`
  font-size: 24px;
  font-weight: 700;
  white-space: pre-wrap;
`;

export const body = css`
  flex: 1;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
  white-space: pre-line;
  overflow-y: scroll;
`;

export const footer = css`
  padding-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const scrim = css`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${theme.zIndex.backdrop};

  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  animation: ${animation.fadeIn} 0.2s ease-in;
`;
