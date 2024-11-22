import { type PropsWithChildren } from 'react'

import { ModalProvider, type ModalContextProps } from './ModalContext.emotion'
import ModalLayout from './ModalLayout.emotion'
import ModalButton from './ModalButton.emotion'

interface ModalProps extends PropsWithChildren {
  context: Pick<ModalContextProps, 'isOpen' | 'onClose' | 'onOpen'>
  preventScroll?: boolean
  hideScrim?: boolean
  isScrimClosable?: boolean
  isEscClosable?: boolean
}

const Modal = (props: ModalProps) => {
  const {
    context,
    hideScrim = false,
    isScrimClosable = true,
    preventScroll = true,
    isEscClosable = true,
    children,
  } = props

  const providerValue = { isScrimClosable, preventScroll, hideScrim, isEscClosable, ...context } as const

  return <ModalProvider {...providerValue}>{children}</ModalProvider>
}

const ModalEmotion = Object.assign(Modal, {
  Layout: ModalLayout,
  Button: ModalButton,
})

export default ModalEmotion
