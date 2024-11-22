import { useId, forwardRef, type ComponentPropsWithoutRef, type ForwardedRef, type ReactNode } from 'react'

import { inputStyle as style } from '@/styles/components/Input'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode
  variant?: 'outlined' | 'filled' | 'none'
}

const Input = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, id, variant = 'outlined', type = 'text', css, ...rest } = props
  const labelId = id ?? useId()
  return (
    <div css={style.containerStyle}>
      {label && (
        <label htmlFor={labelId} css={style.labelStyle}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={labelId}
        type={type}
        css={[style.defaultInputStyle, style.getVariantStyling(variant), css]}
        {...rest}
      />
    </div>
  )
}

export default forwardRef(Input)
