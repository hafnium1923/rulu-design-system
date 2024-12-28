import {
  type ForwardedRef,
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
} from "react";

import { useModalContext } from "@/components/modal/ModalContext";

interface ModalButtonProps extends HTMLAttributes<HTMLButtonElement> {
  act?: "close" | "open";
}

const ModalButton = forwardRef(
  (
    {
      act = "close",
      onClick,
      children,
      ...rest
    }: PropsWithChildren<ModalButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { onClose, onOpen } = useModalContext();

    const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (act === "close") {
        onClose();
      } else {
        onOpen();
      }
    };

    return (
      <button onClick={handleClickButton} ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

export default ModalButton;
