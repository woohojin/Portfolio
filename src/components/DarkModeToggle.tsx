import { useDarkMode } from '../contexts/DarkModeContext'
import styles from './DarkModeToggle.module.css'

export function DarkModeToggle() {
  const { mode, toggle } = useDarkMode()
  return (
    <button className={styles.toggle} onClick={toggle} aria-label="Toggle dark mode">
      {mode === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
