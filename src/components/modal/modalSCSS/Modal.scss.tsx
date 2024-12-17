import type { PropsWithChildren } from "react";

import { ModalProvider, type ModalContextProps } from "../ModalContext";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./ModalLayout.scss";
import ModalButton from "./ModalButton.scss";

interface ModalProps extends PropsWithChildren {
  context: Pick<ModalContextProps, "isOpen" | "onClose" | "onOpen">;
  size?: "small" | "medium" | "large" | "full";
  position?: "top" | "center" | "bottom";
  preventScroll?: boolean;
  hideScrim?: boolean;
  isScrimCloseable?: boolean;
  isEscCloseable?: boolean;
}

/**
 * Modal 루트 컴포넌트
 *
 * @param {object} context - Modal 오픈, 닫힘 상태 제어
 *   @property {boolean} isOpen - Modal 오픈 여부 (useToggle 훅 사용 권장)
 *   @property {function} onOpen - Modal 오픈 함수 (useToggle 훅 사용 권장)
 *   @property {function} onClose - Modal 닫기 함수 (useToggle 훅 사용 권장)
 * @param {"small" | "medium" | "large" | "full"} [size="medium"] - Modal 크기
 * @param {"top" | "center" | "bottom"} [position="center"] - Modal 세로 위치
 * @param {boolean} [preventScroll=false] - Modal 오픈 시 스크롤 방지 여부
 * @param {boolean} [hideScrim=false] - Modal 오픈 시 배경 마스크 숨김 여부
 * @param {boolean} [isScrimCloseable=true] - 배경 클릭 시 Modal 닫힘 여부
 * @param {boolean} [isEscCloseable=true] - ESC 키로 Modal 닫힘 여부
 */
const Modal = ({
  context,
  size = "medium",
  position = "center",
  hideScrim = false,
  isScrimCloseable = true,
  isEscCloseable = true,
  preventScroll = true,
  children,
}: ModalProps) => {
  const providerValue = {
    size,
    position,
    hideScrim,
    isScrimCloseable,
    isEscCloseable,
    preventScroll,
    ...context,
  } as const;

  return <ModalProvider {...providerValue}>{children}</ModalProvider>;
};

/**
 * @component
 * Modal의 내용을 묶는 컴포넌트
 * div 컴포넌트의 모든 속성 사용 가능
 */
Modal.Layout = ModalLayout;

/**
 * @component
 * Modal 내부에서 사용가능한 모달 상태 제어 버튼
 * Button 컴포넌트의 모든 속성 사용 가능
 *
 * @param {"close" | "open"} [act="close"] - 열기 혹은 닫기 선택
 */
Modal.Button = ModalButton;

/**
 * @component
 * Modal의 제목 컴포넌트
 * header 컴포넌트의 모든 속성 사용 가능
 */
Modal.Header = ModalHeader;

/**
 * @component
 * Modal의 내용 컴포넌트
 * div 컴포넌트의 모든 속성 사용 가능
 */
Modal.Body = ModalBody;

/**
 * @component
 * Modal의 꼬리말 영역 컴포넌트
 * div 컴포넌트의 모든 속성 사용 가능
 */
Modal.Footer = ModalFooter;

export default Modal;
