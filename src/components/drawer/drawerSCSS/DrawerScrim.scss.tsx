import { useDrawerContext } from "../DrawerContext";
import * as styles from "./drawer-scrim.module.scss";

const DrawerScrim = () => {
  const { isClosing } = useDrawerContext();
  const scrimAnimation = isClosing
    ? styles["container-close"]
    : styles["container-open"];
  return <div className={`${styles.container} ${scrimAnimation}`} />;
};

export default DrawerScrim;
