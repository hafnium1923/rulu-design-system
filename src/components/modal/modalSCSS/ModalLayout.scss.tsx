import {
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  useRef,
} from "react";

import { createPortal } from "react-dom";

import styles from "./modal.module.scss";
import { useClickOutside } from "@/hooks";
import { useModalContext } from "./ModalContext.scss";
import useModalKeyboard from "../useModalKeyboard";

const ModalLayout = ({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    size,
    position,
    isOpen,
    hideScrim,
    isScrimCloseable,
    isEscCloseable,
    preventScroll,
    onClose,
  } = useModalContext();

  isScrimCloseable && useClickOutside(ref, onClose);
  useModalKeyboard(ref, onClose, preventScroll, isEscCloseable);

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            {!hideScrim && <Scrim />}
            <div aria-modal={isOpen} className={styles["container"]}>
              <div
                ref={ref}
                className={`${styles["modal-layout"]} ${styles[`modal-${size}`]} ${styles[`modal-${position}`]} ${className}`}
                {...rest}
              >
                {children}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
};

const ModalHeader = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadElement>) => {
  return (
    <header className={`${styles["modal-header"]} ${className}`} {...rest}>
      {children}
    </header>
  );
};

const ModalBody = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${styles["modal-body"]} ${className}`} {...rest}>
      {children}
    </div>
  );
};

const ModalFooter = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-part="modal-footer"
      className={`${styles["modal-footer"]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const Scrim = () => <div className={styles["modal-scrim"]} />;

export { ModalLayout, ModalHeader, ModalBody, ModalFooter };
