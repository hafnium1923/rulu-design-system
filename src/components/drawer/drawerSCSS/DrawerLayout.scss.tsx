import { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import type { DrawerProps } from "./Drawer.scss";
import { useDrawerLayout } from "./useDrawerLayout";
import DrawerScrim from "./DrawerScrim.scss";

interface DrawerLayoutProps extends Omit<DrawerProps, "context"> {}

const DrawerLayout = ({
  anchor,
  children,
  variant = "outline",
  hideScrim = false,
  drawerHandleSize = 0,
  isScrimClosable = true,
  isEscCloseable = true,
  ...rest
}: PropsWithChildren<DrawerLayoutProps>) => {
  if (typeof window === "undefined") return <></>;

  const {
    ref,
    isOpen,
    containerStyles,
    drawerStyles,

    handlers: { handleKeydown, handleDrawerClick },
  } = useDrawerLayout({
    anchor,
    variant,
    drawerHandleSize,
    isScrimClosable,
    isEscCloseable,
  });

  return createPortal(
    <div role="presentation" className={containerStyles}>
      {isOpen && !hideScrim && variant === "outline" && <DrawerScrim />}
      <div
        ref={ref}
        className={drawerStyles}
        tabIndex={0}
        onKeyDown={handleKeydown}
        onClick={handleDrawerClick}
        {...rest}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default DrawerLayout;
