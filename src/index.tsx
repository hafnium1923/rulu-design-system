import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'
import App from '@/App'
import { globalReset } from '@/styles'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Global styles={globalReset} />
    <App />
  </StrictMode>
)
