import { type MouseEventHandler, type RefObject } from "react";

export const useMenuList = (
  ref: RefObject<HTMLElement>,
  backgroundClose: boolean,
  handleItemSelect: (value: string) => void,
  handleMenuOpen: () => void
) => {
  //* ref 하위 자식중에 name이 포함된 클래스 네임을 삭제하는 로직
  const removeChildrenClassName = (name: string) => {
    const children = Array.from(ref.current?.children ?? []);

    const index = children.findIndex((child) => child.className.includes(name));

    if (index === -1) {
      return;
    }

    children[index].className = children[index].className
      .split(" ")
      .filter((className) => !className.includes(name))
      .join(" ");
  };

  //* useClickOutSide에게 전달할 이벤트 함수
  const handleClickOutSide = (e: Event) => {
    if (!backgroundClose) {
      removeChildrenClassName("focus");
      return;
    }

    const { target } = e;

    if (target instanceof HTMLButtonElement) {
      return;
    }

    if ((target as HTMLElement).closest("button")) {
      return;
    }

    handleMenuOpen();
  };

  //* 아이템이 클릭되었을 때 이벤트 함수
  const handleMenuClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const { target } = e;

    if (!(target instanceof HTMLLIElement)) {
      const closestLi = (target as HTMLElement).closest("li");

      closestLi !== null && selectItem(closestLi);

      return;
    }

    selectItem(target);
  };

  //* 아이템 선택시 작동하는 함수
  const selectItem = (target: Element) => {
    const value = target.getAttribute("data-key");

    if (!value) {
      return;
    }

    handleItemSelect(value);
    handleMenuOpen();
  };

  return {
    handleClickOutSide,
    selectItem,
    handleMenuClick,
  };
};
