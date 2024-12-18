import { type KeyboardEventHandler, useEffect, useRef } from "react";

import * as styles from "./drawer-layout.module.scss";
import { useClickOutside } from "@/hooks";
import { useDrawerContext } from "../DrawerContext";
import { DrawerProps } from "./Drawer.scss";

export const useDrawerLayout = ({
  anchor,
  variant,
  drawerHandleSize,
  isScrimClosable,
  isEscCloseable,
}: Required<
  Pick<
    DrawerProps,
    | "drawerHandleSize"
    | "anchor"
    | "variant"
    | "isScrimClosable"
    | "isEscCloseable"
  >
>) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, isClosing, onClose, onOpen, onClosing } = useDrawerContext();

  useEffect(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      if (variant === "inline") {
        document.body.style.setProperty("--drawer-width", `${width}px`);
        document.body.style.setProperty("--drawer-height", `${height}px`);
      } else {
        document.body.style.removeProperty("--drawer-width");
        document.body.style.removeProperty("--drawer-height");
      }

      if (drawerHandleSize) {
        document.body.style.setProperty(
          "--drawer-handle",
          `${drawerHandleSize}px`
        );
      } else {
        document.body.style.removeProperty("--drawer-handle");
      }

      if (isOpen) {
        ref.current.focus();
      }

      if (variant === "inline") {
        if (isOpen) {
          document.body.classList.add(styles[`drawer-open-${anchor}`]);
          document.body.classList.remove(styles[`drawer-close-${anchor}`]);
        } else {
          document.body.classList.remove(styles[`drawer-open-${anchor}`]);
          document.body.classList.add(styles[`drawer-close-${anchor}`]);
        }
      }
    }
  }, [isOpen, ref]);

  useEffect(() => {
    if (!isClosing || ref.current === null) {
      return;
    }

    ref.current.getAnimations().forEach((animation) => {
      animation.onfinish = () => {
        onClose();
        onClosing(false);
      };
    });
  }, [isClosing, ref, onClosing, onClose]);

  const handleKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (e.key === "Escape" && isOpen && isEscCloseable) {
      onClosing(true);
    }
  };

  const handleDrawerClick = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  const handleOutSideClick = (e: Event) => {
    if (!isScrimClosable || !isOpen) return;

    const { target } = e;

    if (target instanceof HTMLButtonElement) {
      return;
    }

    if ((target as HTMLElement).closest("button")) {
      return;
    }

    onClosing(true);
  };

  useClickOutside(ref, handleOutSideClick);

  const drawerAnimation = !isOpen
    ? ""
    : isClosing
      ? styles[`close-animation-${anchor}`]
      : styles[`open-animation-${anchor}`];

  const containerStyles = [
    styles.container,
    isOpen ? styles["container-open"] : "",
  ].join(" ");

  const drawerStyles = [
    styles.layout,
    styles[`layout-${variant}`],
    styles[`layout-${anchor}`],
    styles[`layout-${anchor}-${isOpen}`],
    drawerAnimation,
  ].join(" ");

  return {
    ref,
    isOpen,
    containerStyles,
    drawerStyles,

    handlers: {
      handleKeydown,
      handleDrawerClick,
    },
  };
};
