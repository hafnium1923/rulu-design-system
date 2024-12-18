import type {
  ButtonHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
} from "react";

import * as styles from "./drawer-item.module.scss";
import { useDrawerContext } from "../DrawerContext";

interface DrawerItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleItemClick: (
    e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

const DrawerItem = ({
  children,
  handleItemClick,
  className,
  ...rest
}: PropsWithChildren<DrawerItemProps>) => {
  const { onClosing } = useDrawerContext();

  return (
    <button
      className={`${styles.container} ${className}`}
      onClick={(e) => {
        handleItemClick(e);
        onClosing(true);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DrawerItem;
