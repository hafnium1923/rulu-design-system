import {
  type HTMLAttributes,
  useEffect,
  useRef,
  type PropsWithChildren,
  createElement,
} from "react";

import * as styles from "./divider.module.scss";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  variant?: "full" | "insetFront" | "insetBack" | "middle";
  orientation?: "horizontal" | "vertical";
  align?: "center" | "left" | "right";
  as?: "div" | "li";
  margin?: number;
}

const Divider = ({
  variant = "full",
  orientation = "horizontal",
  align = "center",
  as = "div",
  children,
  className,
  margin,
  ...rest
}: PropsWithChildren<DividerProps>) => {
  const childRef = useRef<HTMLElement>(null);
  const Element: React.ElementType = as;
  const commonClass = [
    styles.container,
    styles[`container-${orientation}`],
    styles[`container-${orientation}-${align}`],
    styles[`container-${variant}-${orientation}`],
    className,
  ].join(" ");

  useEffect(() => {
    if (childRef.current) {
      const parent = childRef.current.parentElement;

      if (margin) childRef.current.style.setProperty("--margin", `${margin}px`);

      if (parent) {
        const parentHeight = parent.clientHeight;
        const marginHeight = margin ? margin : parentHeight * 0.08;
        childRef.current.style.setProperty(
          "--margin-height",
          `${marginHeight}px`
        );
      }
    }
  }, []);

  return createElement(
    Element,
    {
      ref: childRef,
      className: commonClass,
      role: "separator",
      "aria-orientation": orientation,
      ...rest,
    },
    children
  );
};

export default Divider;
