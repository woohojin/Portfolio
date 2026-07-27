import styles from './Intro.module.css'

export function Intro() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <h1 className={styles.name}>
        <span className={styles.first}>WOO</span>HOJIN
      </h1>
      <p className={styles.tagline}>Backend Developer</p>
      <button className={styles.cta} onClick={scrollToProjects}>
        See my Portfolio
      </button>
    </section>
  )
}
