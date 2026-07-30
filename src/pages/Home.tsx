import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { StickyHeader } from '../components/StickyHeader'
import { Intro } from '../components/Intro'
import { ProjectCard } from '../components/ProjectCard'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { getAllProjects } from '../content/projects'
import styles from './Home.module.css'

export function Home() {
  const location = useLocation()
  const projects = getAllProjects()

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.key])

  return (
    <div>
      <StickyHeader />
      <Intro />
      <section id="about" className={styles.section}>
        <span className="eyebrow">// about me</span>
        <h2>About</h2>
        <About />
      </section>
      <section id="skills" className={styles.section}>
        <span className="eyebrow">// tech stack</span>
        <h2>Skills &amp; Tools</h2>
        <Skills />
      </section>
      <section id="projects" className={styles.section}>
        <span className="eyebrow">// projects</span>
        <h2>Featured Work</h2>
        <div className={styles.grid}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section id="contact" className={styles.section}>
        <span className="eyebrow">// contact</span>
        <Contact />
      </section>
      <Footer />
    </div>
  )
}
