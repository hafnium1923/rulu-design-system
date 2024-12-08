import {
  useRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

import { useClickOutside } from "@/hooks";
import * as styles from "./modal.emotion.style";
import { useModalContext } from "@/components/modal/ModalContext";
import useModalKeyboard from "@/components/modal/useModalKeyboard";

const ModalLayout = ({
  children,
  css,
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
            <div aria-modal={isOpen} css={styles.container}>
              <div
                ref={ref}
                role="dialog"
                css={[
                  styles.getSizeStyling(size),
                  styles.getPositionStyling(position),
                  styles.layout,
                  css,
                ]}
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

const Scrim = () => <div css={styles.scrim} />;

export const ModalHeader = ({
  children,
  ...rest
}: HTMLAttributes<HTMLElement>) => (
  <header css={styles.header} {...rest}>
    {children}
  </header>
);

export const ModalBody = ({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div css={styles.body} {...rest}>
    {children}
  </div>
);

export const ModalFooter = ({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div data-part="modal-footer" css={styles.footer} {...rest}>
    {children}
  </div>
);

export default ModalLayout;
