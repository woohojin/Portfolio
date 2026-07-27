import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Intro } from '../components/Intro'
import { ProjectCard } from '../components/ProjectCard'
import { getAllProjects } from '../content/projects'
import styles from './Home.module.css'

export function Home() {
  const location = useLocation()
  const projects = getAllProjects()

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <div>
      <Header />
      <Intro />
      <section id="projects" className={styles.projects}>
        <h2>Project</h2>
        <div className={styles.grid}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section id="profile" className={styles.profile}>
        <h2>Profile</h2>
      </section>
    </div>
  )
}
