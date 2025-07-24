import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const themeColor = theme === 'dark' ? 'oklch(0.141 0.005 285.823)' : 'oklch(1 0 0)'

    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <Button
      variant="outline"
      className="size-8"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
