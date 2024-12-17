import type { CSSProperties, HTMLAttributes } from "react";

import { COLOR } from "@/constants/color";
import * as styles from "./badge.module.scss";

export type ColorKey = keyof typeof COLOR;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  direction?: "top" | "bottom";
  position?: "right" | "left";
  overlap?: "rectangle" | "circle";
  visible?: boolean;
  badgeContent?: React.ReactNode | string | number;
  max?: number;
  showZero?: boolean;
  color?: ColorKey | string;
  textColor?: ColorKey;
}

/**
 * Badge 컴포넌트
 *
 * @param {'top' | 'bottom'} [direction='top'] - Badge의 상하 방향
 * @param {'right' | 'left'} [position='right']  - Badge의 좌우 랜더링 위치
 * @param {'rectangle' | 'circle'} [overlap='rectangle'] - Badge가 감싸는 기준모양 (원, 사각형)
 * @param {boolean} [visible=true] - badge를 표시할지 설정
 * @param {React.ReactNode | string | number} badgeContent - Badge의 내용을 설정
 * @param {number} max - Badge의 내용이 숫자일 때 최대값을 설정
 * @param {boolean} showZero - 0일때 Badge를 표시할지 설정
 * @param {ColorKey | string} color - Badge의 배경 색상을 설정. color 객체의 키값 혹은 색상코드
 * @param {ColorKey | string} textColor - Badge의 내용 색상을 설정. color 객체의 키값 혹은 색상코드
 */
const Badge = ({
  direction = "top",
  position = "right",
  overlap = "rectangle",
  badgeContent,
  className,
  color = "RED",
  textColor = "WHITE",
  visible = true,
  max = 99,
  showZero = false,
  children,
  style,
  ...rest
}: BadgeProps) => {
  if (!visible) return <>{children}</>;
  if (typeof badgeContent === "number" && badgeContent <= 0 && !showZero)
    return <>{children}</>;

  if (typeof badgeContent === "number" && badgeContent > max) {
    badgeContent = `${max}+`;
  }

  const getColor = (colorKey?: ColorKey | string) => {
    if (!colorKey) return undefined;
    return colorKey in COLOR ? COLOR[colorKey as keyof typeof COLOR] : colorKey;
  };

  const commonClass = `
    ${styles.badge} 
    ${badgeContent || badgeContent === 0 ? styles.content : ""}
    ${styles[`${direction}-${position}`]}
    ${styles[overlap]}
    ${className}
    `;

  return (
    <div className={styles.container}>
      <span
        className={commonClass}
        style={
          {
            "--badge-color": getColor(color),
            "--badge-text-color": getColor(textColor),
          } as CSSProperties
        }
        {...rest}
      >
        {badgeContent}
      </span>
      {children}
    </div>
  );
};

export default Badge;
