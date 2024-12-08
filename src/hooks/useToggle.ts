import { useRef, useState } from "react";

/**
 * @param {boolean} [preventClose=false]  - 닫기 방지 여부
 * @param {boolean} [defaultState=false] - 모달 초기 오픈 상태
 *
 * @returns {boolean} isOpen - 토글 오픈 상태
 * @returns {function} onOpen - 토글 오픈 함수
 * @returns {function} onClose - 토글 닫기 함수
 * @returns {object} closeGuard - 닫기 가드
 * @returns {boolean} closeGuard.tryClose - 닫기 시도 여부
 * @returns {function} closeGuard.handleConfirmClose - 닫기 확인 함수
 * @returns {function} closeGuard.handleCancelClose - 닫기 취소 함수
 */

export const useToggle = (preventClose = false, defaultState?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultState ?? false);
  const [tryClose, setTryClose] = useState(false);
  const hasUserInteraction = useRef(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (!preventClose || hasUserInteraction.current) {
      setIsOpen(false);
      setTryClose(false);
      hasUserInteraction.current = false;
      return;
    }

    setTryClose(true);
  };

  //* 진짜 닫기
  const handleConfirmClose = () => {
    hasUserInteraction.current = true;
    handleClose();
  };

  //* 닫기 취소
  const handleCancelClose = () => {
    setTryClose(false);
  };

  return {
    isOpen,
    onOpen,
    onClose: handleClose,
    closeGuard: { tryClose, handleConfirmClose, handleCancelClose },
  };
};
