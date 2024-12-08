import type { PropsWithChildren } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./ModalLayout.scss";
import ModalButton from "./ModalButton.scss";
import {
  ModalProvider,
  type ModalContextProps,
} from "@/components/modal/ModalContext";

interface ModalProps extends PropsWithChildren {
  context: Pick<ModalContextProps, "isOpen" | "onClose" | "onOpen">;
  size?: "small" | "medium" | "large" | "full";
  position?: "top" | "center" | "bottom";
  preventScroll?: boolean;
  hideScrim?: boolean;
  isScrimCloseable?: boolean;
  isEscCloseable?: boolean;
}

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

Modal.Layout = ModalLayout;
Modal.Button = ModalButton;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
