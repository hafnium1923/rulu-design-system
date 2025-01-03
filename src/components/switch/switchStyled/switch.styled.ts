import { theme } from "@/styles/emotion";
import styled, { css } from "styled-components";

const backgroundColor = (
  $isOn: boolean,
  $offColor?: string,
  $onColor?: string
) => css`
  background-color: ${$isOn
    ? $onColor || theme.color.black
    : $offColor || theme.color.gray200};
`;

const flexStyles = {
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
};

const sizeStyles = {
  xSmall: css`
    min-width: 28px;
    height: 16px;
  `,
  small: css`
    min-width: 38px;
    height: 20px;
  `,
  medium: css`
    min-width: 48px;
    height: 24px;
  `,
  large: css`
    min-width: 58px;
    height: 30px;
  `,
};

const thumbSizes = {
  xSmall: css`
    font-size: 4px;
    width: 12px;
    height: 12px;
  `,
  small: css`
    font-size: 6px;
    width: 16px;
    height: 16px;
  `,
  medium: css`
    font-size: 8px;
    width: 20px;
    height: 20px;
  `,
  large: css`
    font-size: 10px;
    width: 25px;
    height: 25px;
  `,
};

export const ContainerDiv = styled.div<{
  $descriptionPosition: "top" | "bottom" | "left" | "right";
}>`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ $descriptionPosition }) =>
    ["top", "bottom"].includes($descriptionPosition)
      ? flexStyles.column
      : flexStyles.row}
`;

export const Label = styled.label<{
  $size: "xSmall" | "small" | "medium" | "large";
}>`
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $size }) => sizeStyles[$size]}
`;

export const TrackDiv = styled.div<{
  $variant: "solid" | "raised";
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: background 0.4s;
  background-color: ${({ $offColor }) =>
    $offColor ? $offColor : theme.color.gray200};

  ${({ $variant }) => {
    if ($variant === "solid")
      return css`
        height: 100%;
      `;

    return css`
      height: 40%;
    `;
  }}

  ${({ $isOn, $offColor, $onColor }) =>
    backgroundColor($isOn, $offColor, $onColor)};
`;

export const LabelSpan = styled.span<{
  $size: "xSmall" | "small" | "medium" | "large";
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  font-size: 10px;
  white-space: nowrap;
  color: ${({ $isOn, $onColor, $offColor }) =>
    $isOn ? $onColor || theme.color.white : $offColor || theme.color.gray500};
  flex-grow: 1;
  text-align: center;

  ${({ $size }) => {
    if ($size === "xSmall" || $size === "small")
      return css`
        font-size: 8px;
      `;
  }}

  ${({ $isOn }) => {
    if ($isOn)
      return css`
        margin-left: 10px;
      `;

    return css`
      margin-right: 10px;
    `;
  }}


  ${({ $size, $isOn }) =>
    css`
      margin-${$isOn ? "right" : "left"}: calc(${
        $size === "xSmall"
          ? "18px"
          : $size === "small"
            ? "23px"
            : $size === "medium"
              ? "28px"
              : "34px"
      });
    `};
`;

export const ThumbSpan = styled.span<{
  $variant: "solid" | "raised";
  $size: "xSmall" | "small" | "medium" | "large";
  $isOn: boolean;
  $offColor: string | undefined;
  $onColor: string | undefined;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({ $isOn, $offColor, $onColor }) =>
    backgroundColor(
      $isOn,
      $offColor ?? theme.color.white,
      $onColor ?? theme.color.white
    )};

  ${({ $size }) => thumbSizes[$size]};

  ${({ $size, $isOn, $variant }) => {
    const isSolid = $variant === "solid";
    const solidLeftPositions = {
      xSmall: "calc(100% - 14px)",
      small: "calc(100% - 19px)",
      medium: "calc(100% - 23px)",
      large: "calc(100% - 29px)",
    };

    if (isSolid) {
      return css`
        left: ${$isOn
          ? solidLeftPositions[$size]
          : $size === "xSmall"
            ? "2px"
            : "3px"};
        transition: left 0.4s;
      `;
    }

    return css`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      transition: transform 0.4s;
      ${$isOn && "transform: translateX(142%);"}
    `;
  }}
`;

export const ToggleInput = styled.input.attrs({ type: "checkbox" })`
  display: none;

  &:disabled + ${TrackDiv},&:disabled + ${ThumbSpan} {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
