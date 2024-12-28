import { type LiHTMLAttributes, type PropsWithChildren } from "react";

import * as styles from "./menu-group.module.scss";

export interface MenuGroupProps extends LiHTMLAttributes<HTMLUListElement> {
  title: string;
}

const MenuGroup = (props: PropsWithChildren<MenuGroupProps>) => {
  const { children, title, className, ...rest } = props;

  return (
    <>
      <ul className={`${styles.container} ${className} `} {...rest}>
        <p className={styles.text}>{title}</p>
        {children}
      </ul>
    </>
  );
};

export default MenuGroup;
