import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'

export interface ModalContextProps {
  size: 'small' | 'medium' | 'large' | 'full'
  position: 'top' | 'center' | 'bottom'
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  hideScrim: boolean
  isScrimCloseable: boolean
  isEscCloseable: boolean
  preventScroll: boolean
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}

const ANIMATION_TIME = 300

export const ModalProvider = ({ isOpen, onClose, children, ...rest }: PropsWithChildren<ModalContextProps>) => {
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
