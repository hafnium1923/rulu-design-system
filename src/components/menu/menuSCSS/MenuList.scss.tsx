import { useRef, type OlHTMLAttributes, type PropsWithChildren } from "react";

import { useClickOutside } from "@/hooks";
import * as styles from "./menu-list.module.scss";
import { useMenuContext } from "../MenuContext";
import { useMenuList } from "./useMenuList.scss";
import { useMenuListKeyboard } from "./useMenuListKeyboard.scss";

const MenuList = ({
  children,
  className,
  ...rest
}: PropsWithChildren<OlHTMLAttributes<HTMLOListElement>>) => {
  const ref = useRef<HTMLOListElement>(null);
  const {
    isMenuOpen,
    direction,
    position,
    backgroundClose,
    controlKeys,
    handleMenuOpen,
    handleSelectedValueChange,
  } = useMenuContext();
  const { handleClickOutSide, selectItem, handleMenuClick } = useMenuList(
    ref,
    backgroundClose,
    handleSelectedValueChange,
    handleMenuOpen
  );
  const { handleMouseEnter, handleMouseLeave, handleKeyDown } =
    useMenuListKeyboard(
      ref,
      controlKeys,
      isMenuOpen,
      styles.focus,
      handleMenuOpen,
      selectItem
    );

  useClickOutside(ref, handleClickOutSide);

  return (
    <>
      {isMenuOpen && (
        <ol
          role="menu"
          ref={ref}
          className={`${styles.container} ${styles[`container-${direction}-${position}`]} ${className}`}
          onClick={handleMenuClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </ol>
      )}
    </>
  );
};

export default MenuList;
