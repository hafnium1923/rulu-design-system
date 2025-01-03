import { theme } from "@/styles/emotion";
import styled, { css } from "styled-components";

export const ContainerDiv = styled.div<{
  $descriptionPosition: "top" | "bottom" | "left" | "right";
}>`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ $descriptionPosition }) => {
    if ($descriptionPosition === "top" || $descriptionPosition === "bottom")
      return css`
        flex-direction: row;
      `;

    return css`
      flex-direction: column;
    `;
  }}
`;

export const Label = styled.label<{
  $size: "xSmall" | "small" | "medium" | "large";
}>`
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $size }) => {
    if ($size === "xSmall")
      return css`
        min-width: 28px;
        height: 16px;
      `;

    if ($size === "small")
      return css`
        min-width: 38px;
        height: 20px;
      `;

    if ($size === "medium")
      return css`
        min-width: 48px;
        height: 24px;
      `;

    if ($size === "large")
      return css`
        min-width: 58px;
        height: 30px;
      `;
  }}
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

  ${({ $isOn, $onColor }) => {
    if ($isOn)
      return css`
        background-color: ${$onColor ? $onColor : theme.color.black};
      `;
  }}
`;

export const LabelSpan = styled.span<{
  $size: "xSmall" | "small" | "medium" | "large";
  $isOn: boolean;
}>`
  font-size: 10px;
  white-space: nowrap;
  color: ${theme.color.white};
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


  ${({ $size, $isOn }) => {
    if ($isOn) {
      if ($size === "xSmall")
        return css`
          margin-right: 18px;
        `;

      if ($size === "small")
        return css`
          margin-right: 23px;
        `;

      if ($size === "medium")
        return css`
          margin-right: 28px;
        `;

      if ($size === "large")
        return css`
          margin-right: 34px;
        `;
    }

    if (!$isOn) {
      if ($size === "xSmall")
        return css`
          margin-left: 18px;
        `;

      if ($size === "small")
        return css`
          margin-left: 23px;
        `;

      if ($size === "medium")
        return css`
          margin-left: 28px;
        `;

      if ($size === "large")
        return css`
          margin-left: 34px;
        `;
    }
  }}
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
  background-color: ${({ $offColor }) =>
    $offColor ? $offColor : theme.color.white};

  ${({ $variant, $size, $isOn }) => {
    if ($variant === "solid")
      return css`
        left: 3px;
        transition: left 0.4s;
        ${$size === "xSmall" && "left: 2px;"}
        ${$isOn && "transition: left 0.4s;"}
      `;

    return css`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      transition: transform 0.4s;
      ${$isOn && "transform: translateX(142%);"}
    `;
  }}

  ${({ $size, $isOn, $variant }) => {
    const isSolid = $variant === "solid";
    if ($size === "xSmall")
      return css`
        font-size: 4px;
        width: 12px;
        height: 12px;
        ${isSolid && $isOn && "left: calc(100% - 14px);"}
      `;

    if ($size === "small")
      return css`
        font-size: 6px;
        width: 16px;
        height: 16px;
        ${isSolid && $isOn && "left: calc(100% - 19px);"}
      `;

    if ($size === "medium")
      return css`
        font-size: 8px;
        width: 20px;
        height: 20px;
        ${isSolid && $isOn && "left: calc(100% - 23px);"}
      `;

    if ($size === "large")
      return css`
        font-size: 10px;
        width: 25px;
        height: 25px;
        ${isSolid && $isOn && "left: calc(100% - 29px);"}
      `;
  }}

  ${({ $isOn, $onColor }) =>
    $isOn &&
    css`
      background-color: ${$onColor ? $onColor : theme.color.white};
    `}
`;

export const ToggleInput = styled.input.attrs({ type: "checkbox" })`
  display: none;

  &:disabled + ${TrackDiv},&:disabled + ${ThumbSpan} {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
