import { css } from '@emotion/react'

import { animation, theme } from '@/styles'

export const dialogStyle = css`
  display: block;
  z-index: ${theme.zIndex.modal};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  animation: ${animation.fadeIn} 0.2s ease-in 0.05s forwards;
  opacity: 0;
`
export const layoutStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const scrimStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${theme.zIndex.backdrop};

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.15);
  animation: ${animation.fadeIn} 0.2s ease-in;
`
