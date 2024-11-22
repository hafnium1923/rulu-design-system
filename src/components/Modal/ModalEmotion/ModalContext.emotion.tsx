import { createContext, useEffect, useState, type PropsWithChildren } from 'react'

export interface ModalContextProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  hideScrim: boolean
  isScrimClosable: boolean
  isEscClosable: boolean
  preventScroll: boolean
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

const ANIMATION_TIME = 300

export const ModalProvider = (props: PropsWithChildren<ModalContextProps>) => {
  const { isOpen, onClose, children, ...rest } = props
  const [isMounted, setIsMounted] = useState(isOpen)

  const handleClose = () => {
    onClose()

    setTimeout(() => {
      !isOpen && setIsMounted(false)
    }, ANIMATION_TIME)
  }

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    } else {
      const timer = setTimeout(() => {
        !isOpen && setIsMounted(false)
      }, ANIMATION_TIME)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const providerValue = {
    isOpen,
    onClose: handleClose,
    ...rest,
  }

  if (!isMounted) return null

  return <ModalContext.Provider value={providerValue}>{children}</ModalContext.Provider>
}
