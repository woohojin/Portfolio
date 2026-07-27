import { Link } from 'react-router-dom'
import { DarkModeToggle } from './DarkModeToggle'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>W</Link>
      <nav className={styles.nav}>
        <Link to="/#projects">Project</Link>
        <Link to="/#profile">Profile</Link>
      </nav>
      <DarkModeToggle />
    </header>
  )
}
