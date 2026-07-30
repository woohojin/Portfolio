import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>&lt;WHJ /&gt;</span>
      <span className={styles.copyright}>© {new Date().getFullYear()} 우호진 · Built with React</span>
    </footer>
  )
}
