import { forwardRef, type MouseEvent, type ForwardedRef } from 'react'

import ButtonEmotion, { type ButtonProps } from '@/components/Button/Button.emotion'
import { useModal } from './useModal.emotion'

interface ModalButtonProps extends ButtonProps {
  act?: 'close' | 'open'
}

const ModalButton = (props: ModalButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { act = 'close', onClick, children, ...attributes } = props
  const { onClose, onOpen } = useModal()

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
    if (act === 'close') {
      onClose()
    } else {
      onOpen()
    }
  }

  return (
    <ButtonEmotion onClick={handleClickButton} ref={ref} {...attributes}>
      {children}
    </ButtonEmotion>
  )
}

export default forwardRef(ModalButton)
