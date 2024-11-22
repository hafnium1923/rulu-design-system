import { forwardRef, type ComponentPropsWithoutRef, type ForwardedRef } from 'react'

import { buttonStyle as style } from '@/styles/components/Button'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'normal' | 'plain'
}

const Button = (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { size = 'medium', variant = 'normal', type = 'button', children, css, ...rest } = props

  return (
    <button
      css={[style.getSizeStyling(size, variant), style.getVariantStyling(variant), style.buttonStyling, css]}
      ref={ref}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default forwardRef(Button)
