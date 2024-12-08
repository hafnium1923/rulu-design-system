import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import App from '@/App'
import { globalReset } from '@/styles'
import './styles/scss/reset.scss'
import './styles/scss/global.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Global styles={globalReset} />
    <App />
  </StrictMode>
)
