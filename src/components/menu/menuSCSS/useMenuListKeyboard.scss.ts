import {
  useRef,
  type MouseEventHandler,
  type KeyboardEventHandler,
  type RefObject,
  useEffect,
  useState,
} from "react";

import { NO_TRIGGER, TRIGGER_KEYS } from "@/constants/keyboard";
import type { TriggerKey } from "@/types/keyboard";

export const useMenuListKeyboard = (
  ref: RefObject<HTMLElement>,
  controlKeys: typeof NO_TRIGGER | TriggerKey[],
  isMenuOpen: boolean,
  className: string,
  onClose: () => void,
  onSelect: (target: Element) => void
) => {
  //* 메뉴리스트에 마우스가 위치해 있는지
  const isMouseOver = useRef(false);
  const [paddingHeight, setPaddingHeight] = useState(0);

  const handleMouseEnter: MouseEventHandler<HTMLUListElement> = () => {
    isMouseOver.current = true;
  };

  const handleMouseLeave: MouseEventHandler<HTMLUListElement> = () => {
    isMouseOver.current = false;
  };

  //* 키보드 이벤트 함수. 입력 키에 따른 분기처리
  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (!isTriggerKey(e.key) || controlKeys === NO_TRIGGER) {
      return;
    }

    e.preventDefault();

    if (e.key === "Escape" && controlKeys.includes(e.key)) {
      onClose();
      return;
    }

    const children = Array.from(ref.current?.children ?? []).flatMap(
      (child) => {
        if (child.tagName === "UL") {
          const paddingBottom = getComputedStyle(child).paddingBottom;
          setPaddingHeight(Number(paddingBottom.replace("px", "")));

          return Array.from(child.children).filter(
            (grandchild) => grandchild.tagName === "LI"
          );
        } else if (
          child.tagName === "LI" &&
          child.getAttribute("role") !== "separator"
        ) {
          return [child];
        }
        return [];
      }
    );

    const selectedChildIndex = children.findIndex((child) =>
      child.className.includes("true")
    );
    const focusedChildIndex = children.findIndex((child) =>
      child.className.includes(className)
    );

    const targetIndex =
      selectedChildIndex !== focusedChildIndex && focusedChildIndex !== -1
        ? focusedChildIndex
        : selectedChildIndex;

    if (e.key === "ArrowUp" && controlKeys.includes(e.key)) {
      if (targetIndex === -1) {
        isMouseOver.current
          ? focusPrevChild(children, getHoveredChildIndex(children))
          : focusChild(children[children.length - 1]);

        return;
      }

      removeClassName(children[targetIndex], className);
      focusPrevChild(children, targetIndex - 1);

      return;
    }

    if (e.key === "ArrowDown" && controlKeys.includes(e.key)) {
      if (targetIndex === -1) {
        isMouseOver.current
          ? focusNextChild(children, getHoveredChildIndex(children))
          : focusChild(children[0]);

        return;
      }
      removeClassName(children[targetIndex], className);
      focusNextChild(children, targetIndex + 1);

      return;
    }

    if (e.key === "Enter" && controlKeys.includes(e.key)) {
      if (targetIndex === -1) {
        return;
      }

      onSelect(children[targetIndex]);
    }
  };

  //* 이동방향에 따라 스크롤 위치 로직 (아래로가면 아래 고정, 위로가면 위로 고정)
  const scrollToChild = (child: Element) => {
    if (!(child instanceof HTMLLIElement)) {
      return;
    }
    const { offsetTop, clientHeight } = child;

    const menuHeight = ref.current?.clientHeight;
    const scrollTop = ref.current?.scrollTop;

    if (menuHeight === undefined || scrollTop === undefined) return;

    if (
      scrollTop < offsetTop &&
      offsetTop + clientHeight < scrollTop + menuHeight
    )
      return;

    if (
      menuHeight &&
      scrollTop !== undefined &&
      scrollTop + menuHeight < offsetTop + clientHeight
    ) {
      //* 아래로 갈때 하단 픽스
      const scrollToPosition = offsetTop + clientHeight - menuHeight;
      ref.current?.scrollTo(0, scrollToPosition + paddingHeight);
    } else if (
      menuHeight &&
      scrollTop &&
      scrollTop + menuHeight > offsetTop + clientHeight
    ) {
      //* 위로갈 때 상단 픽스
      ref.current?.scrollTo(0, offsetTop);
    }
  };

  const isTriggerKey = (key: string): key is TriggerKey => {
    return Object.values(TRIGGER_KEYS).includes(key as TriggerKey);
  };

  const removeClassName = (children: Element, name: string) => {
    children.className = children.className
      .split(" ")
      .filter((className) => !className.includes(name))
      .join(" ");
  };

  //* 마우스가 위치해있는 자식 인덱스
  const getHoveredChildIndex = (children: Element[]) => {
    const hoveredChild = ref.current?.querySelector(":hover");
    const hoveredChildIndex = children.findIndex(
      (child) => child === hoveredChild
    );

    return hoveredChildIndex;
  };

  //* 현재 위치 기준으로 위로 갈때
  const focusPrevChild = (children: Element[], prevIndex: number) => {
    if (prevIndex === -1) {
      focusChild(children[children.length - 1]);
      return;
    }

    const prevChild = children[prevIndex];

    focusChild(prevChild);
  };

  //* 현재 위치 기준으로 아래로 갈때
  const focusNextChild = (children: Element[], nextIndex: number) => {
    if (nextIndex === children.length) {
      focusChild(children[0]);
      return;
    }

    const nextChild = children[nextIndex];

    focusChild(nextChild);
  };

  const focusChild = (child: Element) => {
    child.className += ` ${className}`;

    scrollToChild(child);
  };

  useEffect(() => {
    if (isMenuOpen && ref.current) {
      ref.current.focus();

      const children = Array.from(ref.current.children ?? []);

      const selectedChildIndex = children.findIndex((child) =>
        child.className.includes("true")
      );
      scrollToChild(children[selectedChildIndex]);
    }
  }, [isMenuOpen]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
    scrollToChild,
  };
};
