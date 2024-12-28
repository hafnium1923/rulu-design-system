import { type HTMLAttributes, type PropsWithChildren } from "react";

import { useMenuContext } from "./MenuContext";

const MenuButton = (
  props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
) => {
  const { children, ...rest } = props;
  const { isMenuOpen, handleMenuOpen } = useMenuContext();

  return (
    <button
      aria-haspopup="true"
      aria-expanded={isMenuOpen}
      onClick={handleMenuOpen}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MenuButton;
