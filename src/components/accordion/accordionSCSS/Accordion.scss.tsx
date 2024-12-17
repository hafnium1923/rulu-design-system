import {
  Children,
  cloneElement,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEventHandler,
  type ReactElement,
  type PropsWithChildren,
} from "react";

import { AccordionProvider } from "../AccordionContext";
import AccordionItem from "./AccordionItem.scss";
import AccordionTitle from "./AccordionTitle.scss";
import AccordionContent from "./AccordionContent.scss";
import * as styles from "./accordion.module.scss";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  width?: number;
  variant?: "outline" | "enclosed" | "plain" | "subtle";
  defaultValue?: string | string[];
  allowMultiple?: boolean;
  handleAccordionCallback?: (value: string) => void;
}

/**
 * Accordion 루트 컴포넌트
 *
 * @param {string} color - Accordion 경계 혹은 배경 색상
 * @param {number} width - Accordion 너비. 설정하지 않으면 상위 요소의 width 100%로 적용
 * @param {'outline' | 'enclosed' | 'plain' | 'subtle'} [variant='outline'] - Accordion의 스타일링 방법.
 * @param {string | string[]} [defaultValue=[]] - 기본으로 열려있을 Accordion의 value 혹은 value배열.
 * @param {boolean} [allowMultiple=false] - Accordion의 다중 오픈 허용 여부
 * @param {(value: string) => void} handleAccordionCallback - Accordion 클릭 시 실행할 함수
 */
const Accordion = ({
  variant = "outline",
  defaultValue = [],
  allowMultiple = false,
  color,
  width,
  handleAccordionCallback,
  children,
  className,
  ...rest
}: PropsWithChildren<AccordionProps>) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const focusIndex = itemRefs.current.findIndex(
      (ref) => ref === document.activeElement
    );
    if (focusIndex === -1) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (focusIndex + 1) % itemRefs.current.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex =
        (focusIndex - 1 + itemRefs.current.length) % itemRefs.current.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  const value = {
    allowMultiple,
    defaultValue,
    handleAccordionCallback,
  } as const;

  return (
    <AccordionProvider {...value}>
      <div
        className={`${styles.accordion} ${styles[`accordion-${variant}`]} ${className}`}
        style={
          {
            "--accordion-width": `${width}px`,
            "--accordion-color": color,
          } as CSSProperties
        }
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child as ReactElement, {
            ref: (el: HTMLDivElement) => (itemRefs.current[index] = el),
          })
        )}
      </div>
    </AccordionProvider>
  );
};

/**
 * @component
 * 하나의 Accordion을 묶는 아이템 컴포넌트
 *
 * @param {string} value - Accordion이 선택되었을 때 사용되는 value (필수 값)
 * @param {boolean} [isDisabled=false] - Accordion 아이템 실행 금지
 */
Accordion.Item = AccordionItem;

/**
 * @component
 * 하나의 Accordion을 묶는 아이템 컴포넌트
 *
 * @param {type ReactNode} icon - Accordion 확장 아이콘을 변경할 때 사용
 * @param {type ReactNode} children - Accordion의 서랍 제목에 나타날 요소
 */
Accordion.Title = AccordionTitle;

/**
 * @component
 * 하나의 Accordion을 묶는 아이템 컴포넌트
 *
 * @param {number} maxHeight - Accordion이 펼쳐졌을 때 최대 높이 지정. 없으면 children의 높이 그대로 가져감
 * @param {type ReactNode} children - Accordion이 펼쳐졌을  때 내용에 나타날 요소
 */
Accordion.Content = AccordionContent;
export default Accordion;
