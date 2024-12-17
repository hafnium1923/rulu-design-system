import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

import Svg from "@/components/common/Svg";
import * as styles from "./accordion.module.scss";

interface AccordionTitleProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

const AccordionTitle = ({
  icon,
  children,
  className,
  ...rest
}: PropsWithChildren<AccordionTitleProps>) => {
  return (
    <div className={`${styles["accordion-title"]} ${className}`} {...rest}>
      {children}
      <div className={styles.handle}>
        {icon ? icon : <Svg type="Arrow" size={"30"} />}
      </div>
    </div>
  );
};

export default AccordionTitle;
