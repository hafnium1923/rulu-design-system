import { type RefObject, useEffect, useRef } from 'react'

interface FocusRefType {
  elements: HTMLElement[]
  currentIndex: number
}

const useModalKeyboard = (
  modalRef: RefObject<HTMLElement>,
  onClose: () => void,
  preventScroll: boolean,
  isEscCloseable: boolean
) => {
  const focusState = useRef<FocusRefType>({
    elements: [],
    currentIndex: -1,
  })

  //* 포커스 가능한 요소 찾기
  const getFocusableElements = (element: HTMLElement): HTMLElement[] => {
    if (!element) throw new Error('Element is not defined')

    return Array.from(
      element.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
  }

  const moveFocus = (direction: 'prev' | 'next', e: KeyboardEvent) => {
    const { elements, currentIndex } = focusState.current
    if (!elements.length) return

    e.preventDefault()
    let newIndex: number

    if (direction === 'prev') {
      newIndex = currentIndex < 1 ? elements.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex < 0 || currentIndex >= elements.length - 1 ? 0 : currentIndex + 1
    }

    elements[newIndex]?.focus()
    focusState.current.currentIndex = newIndex
  }

  const handleArrowKeys = (e: KeyboardEvent) => {
    const { currentIndex } = focusState.current
    const footerElement = modalRef.current?.querySelector<HTMLElement>('[data-part="modal-footer"]')
    if (!footerElement) return

    const focusableFooterElements = getFocusableElements(footerElement)
    if (!focusableFooterElements.length) return

    if (currentIndex > -1) {
      if (e.key === 'ArrowLeft') moveFocus('prev', e)
      if (e.key === 'ArrowRight') moveFocus('next', e)
      return
    }

    //* 포커스된 요소가 없을 때 기본 처리
    const targetElement = e.key === 'ArrowLeft' ? focusableFooterElements.at(-1) : focusableFooterElements[0]

    if (targetElement) {
      focusState.current.currentIndex = focusState.current.elements.indexOf(targetElement)
      targetElement.focus()
    }
  }

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return

    const footerElement = modalRef.current?.querySelector<HTMLElement>('[data-part="modal-footer"]')
    if (!footerElement) return

    //* 현재 포커스된 요소 클릭
    if (focusState.current.currentIndex > -1 && focusState.current.elements) {
      const { elements, currentIndex } = focusState.current
      e.preventDefault()
      elements[currentIndex].click()
      return
    }

    //* footer 버튼이 하나일 때 클릭, 아니면 첫 번째 버튼으로 포커스
    const footerButtons = getFocusableElements(footerElement)
    if (!footerButtons.length) return

    e.preventDefault()
    if (footerButtons.length === 1 && footerButtons[0].tagName === 'BUTTON') {
      footerButtons[0].click()
    } else {
      footerButtons[0].focus()
      const currentIndex = focusState.current.elements.indexOf(footerButtons[0])
      focusState.current.currentIndex = currentIndex
    }
  }

  const handleKeyboardEvents = (e: KeyboardEvent) => {
    if (!modalRef.current) throw new Error('Modal reference is not defined')

    if (isEscCloseable && e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'Tab') {
      e.shiftKey ? moveFocus('prev', e) : moveFocus('next', e)
      return
    }

    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      handleArrowKeys(e)
      return
    }

    if (e.key === 'Enter') {
      handleEnterKey(e)
    }
  }

  useEffect(() => {
    if (!modalRef.current) return

    // 초기 포커스 상태 설정
    focusState.current = {
      elements: getFocusableElements(modalRef.current),
      currentIndex: -1,
    }

    document.addEventListener('keydown', handleKeyboardEvents)
    if (preventScroll) document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyboardEvents)
      if (preventScroll) document.body.style.overflow = 'unset'
    }
  }, [modalRef, preventScroll])
}

export default useModalKeyboard
