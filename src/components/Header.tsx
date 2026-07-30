import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DarkModeToggle } from './DarkModeToggle'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
        onClick={() => {
          close()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        &lt;WHJ /&gt;
      </Link>
      <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
        <Link to="/#about" onClick={close}>
          About
        </Link>
        <Link to="/#skills" onClick={close}>
          Skills
        </Link>
        <Link to="/#projects" onClick={close}>
          Projects
        </Link>
        <Link to="/#contact" onClick={close}>
          Contact
        </Link>
        <Link to="/#contact" className={styles.contactBtn} onClick={close}>
          Contact Me
        </Link>
      </nav>
      <div className={styles.actions}>
        <DarkModeToggle />
        <button
          className={styles.menuToggle}
          onClick={() => setOpen(current => !current)}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
