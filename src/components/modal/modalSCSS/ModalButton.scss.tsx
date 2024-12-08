import { type ForwardedRef, forwardRef, type MouseEvent } from "react";

import { useModalContext } from "@/components/modal/ModalContext";
import Button, {
  type ButtonProps,
} from "@/components/button/buttonSCSS/Button.scss";

interface ModalButtonProps extends ButtonProps {
  act?: "close" | "open";
}

const ModalButton = forwardRef(
  (
    { act = "close", onClick, children, ...rest }: ModalButtonProps,
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
      <Button onClick={handleClickButton} ref={ref} {...rest}>
        {children}
      </Button>
    );
  }
);

export default ModalButton;
