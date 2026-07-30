import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Mode = 'dark' | 'light'

interface DarkModeContextValue {
  mode: Mode
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(undefined)

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem('mode')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('mode', mode)
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(mode)
  }, [mode])

  const toggle = () => setMode(current => (current === 'dark' ? 'light' : 'dark'))

  return <DarkModeContext.Provider value={{ mode, toggle }}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used within a DarkModeProvider')
  return ctx
}
