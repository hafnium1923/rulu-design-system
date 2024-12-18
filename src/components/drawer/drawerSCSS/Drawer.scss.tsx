import { ComponentPropsWithoutRef, type PropsWithChildren } from "react";

import { DrawerProvider, type DrawerProviderProps } from "../DrawerContext";
import DrawerLayoutScss from "./DrawerLayout.scss";
import DrawerItem from "./DrawerItem.scss";

export interface DrawerProps extends ComponentPropsWithoutRef<"div"> {
  anchor: "left" | "right" | "top" | "bottom";
  variant?: "outline" | "inline";
  drawerHandleSize?: number;
  hideScrim?: boolean;
  isScrimClosable?: boolean;
  isEscCloseable?: boolean;
  context?: DrawerProviderProps["context"];
}

/**
 * Drawer 루트 컴포넌트
 *
 * @param {object} context - Drawer의 상태 및 메서드를 포함한 객체. 넘기지 않으면 항상 열려있는 상태가 된다.
 *   @property {boolean} isOpen - Drawer가 열려 있는지 여부 (useToggle 훅 사용 권장)
 *   @property {function} onOpen - Drawer를 여는 함수 (useToggle 훅 사용 권장)
 *   @property {function} onClose -Drawer를 닫는 함수 (useToggle 훅 사용 권장)
 * @param {'left' | 'right' | 'top' | 'bottom'} anchor - 드로워 열리는 방향
 * @param {'outline' | 'inline'} [variant='outline'] - 바디 영역 위에 드로워 열린건지 안에 열릴건지
 * @param {number} drawerHandleSize - 드로워 손잡이 얼마큼 보일건지
 * @param {boolean} [hideScrim=false] - 백그라운드 보일지 안보일지
 * @param {boolean} [isScrimClosable=true] - 백그라운드 클릭으로 드로워 닫을지 여부
 * @param {boolean} [isEscCloseable=true] - ESC로 드로워 닫을지 여부
 */
const Drawer = ({
  context,
  children,
  ...rest
}: PropsWithChildren<DrawerProps>) => {
  return (
    <DrawerProvider context={context}>
      <DrawerLayoutScss {...rest}>{children}</DrawerLayoutScss>
    </DrawerProvider>
  );
};

/**
 * Drawer 컴포넌트의 항목을 나타내는 컴포넌트.
 *
 * @component
 * @param {(e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>void} handleItemClick - 드로워 클릭하고 작동할 콜백함수
 */
Drawer.Item = DrawerItem;

export default Drawer;
