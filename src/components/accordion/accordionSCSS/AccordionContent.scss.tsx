import type { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

import * as styles from "./accordion.module.scss";

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: number;
}

const AccordionContent = ({
  children,
  maxHeight,
  className,
  ...rest
}: PropsWithChildren<AccordionContentProps>) => (
  <div
    className={`${styles["accordion-content"]} ${className}`}
    style={
      {
        "--accordion-max-height": `${maxHeight}px`,
      } as CSSProperties
    }
    {...rest}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

export default AccordionContent;
