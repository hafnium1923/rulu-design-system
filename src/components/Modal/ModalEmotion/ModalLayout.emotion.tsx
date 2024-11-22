import { useEffect, useRef, type ComponentPropsWithRef } from 'react'
import { createPortal } from 'react-dom'

import { useModal } from './useModal.emotion'
import { useClickOutside, useKeydownEffect } from '@/hooks'
import { modalStyle as style } from '@/styles/components/Modal'

type ModalLayoutProps = ComponentPropsWithRef<'dialog'>

const ModalLayout = (props: ModalLayoutProps) => {
  const { children, css, ...rest } = props
  const ref = useRef<HTMLDialogElement>(null)
  const { isOpen, onClose, hideScrim, isScrimClosable, isEscClosable, preventScroll } = useModal()

  isScrimClosable && useClickOutside(ref, onClose)
  isEscClosable && useKeydownEffect('ESC', onClose)

  useEffect(() => {
    if (preventScroll) document.body.style.overflow = 'hidden'

    return () => {
      if (preventScroll) document.body.style.overflow = 'unset'
    }
  }, [preventScroll])

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            {!hideScrim && <Scrim />}
            <dialog ref={ref} open={isOpen} css={[style.dialogStyle, css]} {...rest}>
              <form method='dialog' css={style.layoutStyle}>
                {children}
              </form>
            </dialog>
          </>,
          document.body
        )}
    </>
  )
}

const Scrim = () => <div css={style.scrimStyle} />

export default ModalLayout
