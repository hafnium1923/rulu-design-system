import { type PropsWithChildren } from 'react'

import { type ModalContextProps, ModalProvider } from './ModalContext.emotion'
import ModalLayout, { ModalBody, ModalFooter, ModalHeader } from './ModalLayout.emotion'
import ModalButton from './ModalButton.emotion'

interface ModalProps extends PropsWithChildren {
  context: Pick<ModalContextProps, 'isOpen' | 'onClose' | 'onOpen'>
  size?: 'small' | 'medium' | 'large' | 'full'
  position?: 'top' | 'center' | 'bottom'
  preventScroll?: boolean
  hideScrim?: boolean
  isScrimCloseable?: boolean
  isEscCloseable?: boolean
}

const Modal = ({
  context,
  size = 'medium',
  position = 'center',
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
  } as const

  return <ModalProvider {...providerValue}>{children}</ModalProvider>
}

Modal.Layout = ModalLayout
Modal.Button = ModalButton
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
