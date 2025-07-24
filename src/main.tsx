import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'

import AppRoutes from './routes/AppRoutes.tsx'

import './globals.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
  >
    <AppRoutes />
  </ThemeProvider>
)
