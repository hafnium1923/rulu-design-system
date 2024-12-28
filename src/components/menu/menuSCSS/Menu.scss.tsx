import type { PropsWithChildren } from "react";

import { MenuProvider } from "../MenuContext";
import MenuList from "./MenuList.scss";
import MenuItem from "./MenuItem.scss";
import MenuGroup from "./MenuGroup.scss";

import type { NO_TRIGGER } from "@/constants/keyboard";
import type { TriggerKey } from "@/types/keyboard";
import MenuButton from "../MenuButton";

interface MenuProps {
  context: {
    direction: "top" | "bottom" | "left" | "right";
    position?: "left" | "right";
    backgroundClose?: boolean;
    controlKeys?: typeof NO_TRIGGER | TriggerKey[];
    rememberItem?: boolean;
    handleItemSelect: (value: string) => void;
  };
}

/**
 * Menu 루트 컴포넌트
 * @param {Object} context - 메뉴 컨텍스트 설정 객체
 * @param {'top' | 'bottom' | 'left' | 'right'} [context.direction='bottom'] - 메뉴가 열리는 방향 (기본값: 'bottom')
 * @param {'left' | 'right'} [context.position='right'] - 메뉴가 렌더링되는 방향 (기본값: 'right'). `direction`이 좌우일 때, `left`는 위쪽, `right`는 아래쪽을 의미.
 * @param {boolean} [context.backgroundClose=true] - 배경 클릭 시 메뉴 닫기 여부 (기본값: true)
 * @param {boolean} [context.rememberItem=false] - 아이템 기억 여부 (기본값: false)
 * @param {typeof NO_TRIGGER | TriggerKey[]} [context.controlKeys] - 키보드 조작 시 사용할 키 배열
 * @param {(value: string) => void} context.handleItemSelect - 필수. 메뉴 아이템을 클릭하면 실행할 함수
 */
const Menu = ({ context, children }: PropsWithChildren<MenuProps>) => {
  return (
    <MenuProvider context={context}>
      <div style={{ position: "relative", height: "fit-content" }}>
        {children}
      </div>
    </MenuProvider>
  );
};

Menu.Button = MenuButton;

/**
 * Menu 컴포넌트를 하나로 묶는 컨테이너 컴포넌트
 *
 * @component
 */
Menu.List = MenuList;

/**
 * Menu 컴포넌트의 항목을 나타내는 컴포넌트
 *
 * @component
 * @param {string} value - Menu의 key값
 * @param {ReactNode} children - 메뉴 아이템에 렌더링할 자식
 */
Menu.Item = MenuItem;

/**
 * Menu 아이템을 묶는 그룹 컨테이너 컴포넌트
 *
 * @component
 *
 * @param {string} title - 그룹이름
 */
Menu.Group = MenuGroup;

export default Menu;
