import {
  type PropsWithChildren,
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

import * as styles from "./tooltip.module.scss";

export interface TooltipProps {
  label: ReactNode | string;
  opened?: boolean;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  control?: "hover" | "click";
  mainAxis?: number;
  crossAxis?: number;
  withArrow?: boolean;
  disabled?: boolean;
  color?: string;
  style?: CSSProperties;
}

/**
 * Tooltip 컴포넌트
 *
 * @param {ReactNode | string} label - 툴팁 내용
 * @param {boolean} opened - 툴팁 항상 열림 여부
 * @param { 'top'| 'bottom' | 'left'| 'right'| 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'} position - 기준 컴포넌트 기반 툴팁 위치
 * @param {'hover' | 'click'} control - 툴팁을 여는 트리거 (호버/클릭)
 * @param {number} mainAxis - 수직(상/하) 일 때만 적용되는 offset
 * @param {number} crossAxis - 수평(좌/우) 일 때만 적용되는 offset
 * @param {boolean} withArrow - 툴팁 화살표 여부
 * @param {boolean} disabled - 툴팁 비활성화 여부
 * @param {string} color - 툴팁 색상
 * @param {CSSProperties} style - 스타일
 */
const Tooltip = ({
  children,
  label,
  opened = false,
  position = "bottom",
  color,
  mainAxis = 15,
  crossAxis = 15,
  withArrow = true,
  control = "hover",
  disabled = false,
  style,
}: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(opened);
  const vertical = position === "top" || position === "bottom";

  useEffect(() => {
    setVisible(opened);
  }, [opened]);

  const handleTooltipToggle = () => {
    if (!disabled) {
      setVisible((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (control === "hover" && !disabled) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (control === "hover" && !disabled) {
      setVisible(false);
    }
  };

  // 화살표 색상 처리
  const arrowColor = style?.background || color;

  return (
    <div
      className={`${styles.container} ${disabled && styles.disabled}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={!opened ? handleMouseLeave : undefined}
      onClick={control === "click" ? handleTooltipToggle : undefined}
      style={
        {
          "--main-axis": `${mainAxis}px`,
          "--cross-axis": `${crossAxis}px`,
          "--tooltip-color": color,
        } as CSSProperties
      }
    >
      {children}
      {visible && (
        <div style={style} className={`${styles.tooltip} ${styles[position]}`}>
          {withArrow && (
            <div
              className={`${styles.arrow} ${styles[position]}`}
              style={{
                borderColor: vertical
                  ? `${arrowColor} transparent`
                  : `transparent ${arrowColor}`,
              }}
            />
          )}
          {label}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
