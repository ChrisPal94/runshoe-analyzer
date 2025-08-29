'use client'

import { useTheme } from 'next-themes'
import { Button } from './Button'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
