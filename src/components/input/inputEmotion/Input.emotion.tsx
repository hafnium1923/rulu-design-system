import { useId, forwardRef, type ComponentPropsWithoutRef, type ForwardedRef, type ReactNode } from 'react'

import * as styles from './input.emotion.style'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode
  variant?: 'outlined' | 'filled' | 'none'
}

const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, id, variant = 'outlined', type = 'text', css, ...rest } = props
  const labelId = id ?? useId()
  return (
    <div css={styles.containerStyle}>
      {label && (
        <label htmlFor={labelId} css={styles.labelStyle}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={labelId}
        type={type}
        css={[styles.defaultInputStyle, styles.getVariantStyling(variant), css]}
        {...rest}
      />
    </div>
  )
})

export default Input
