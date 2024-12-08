//* react core
import { forwardRef, type MouseEvent } from "react";

//* internal
import { useModalContext } from "./ModalContext.scss";
import Button, {
  type ButtonProps,
} from "@/components/button/buttonSCSS/Button.scss";

interface ModalButtonProps extends ButtonProps {
  act?: "close" | "open";
}

const ModalButton = forwardRef(
  ({ act = "close", onClick, children, ref, ...rest }: ModalButtonProps) => {
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
