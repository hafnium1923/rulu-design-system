import {
  forwardRef,
  type KeyboardEventHandler,
  type PropsWithChildren,
} from "react";

import { useAccordionContext } from "../AccordionContext";
import * as styles from "./accordion.module.scss";

interface AccordionItemProps {
  value: string;
  isDisabled?: boolean;
}

const AccordionItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AccordionItemProps>
>(({ value, isDisabled = false, children }, ref) => {
  const { isOpen, toggleAccordion } = useAccordionContext();

  const handleClick = () => {
    if (!isDisabled) toggleAccordion(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (isDisabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordion(value);
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles["accordion-item"]} ${isOpen(value) && styles.open} ${isDisabled ? styles.disabled : ""}`}
      aria-expanded={isOpen(value)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
});

export default AccordionItem;
