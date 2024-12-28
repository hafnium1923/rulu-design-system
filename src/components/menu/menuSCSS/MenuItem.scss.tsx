import { type LiHTMLAttributes, type PropsWithChildren } from "react";

import * as styles from "./menu-item.module.scss";
import { useMenuContext } from "../MenuContext";

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  value: string;
}

const MenuItem = (props: PropsWithChildren<MenuItemProps>) => {
  const { children, value, className, ...rest } = props;
  const { selectedValue } = useMenuContext();
  const isSelected = selectedValue === value;

  return (
    <>
      <li
        role="menuitem"
        data-key={value}
        className={`${styles.container} ${isSelected} ${className} `}
        {...rest}
      >
        {isSelected && <span className={styles.check}>✓</span>}
        {children}
      </li>
    </>
  );
};

export default MenuItem;
