import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Intro } from '../components/Intro'
import { ProjectCard } from '../components/ProjectCard'
import { ProfileSection } from '../components/ProfileSection'
import { getAllProjects } from '../content/projects'
import styles from './Home.module.css'

export function Home() {
  const location = useLocation()
  const projects = getAllProjects()
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.key])

  useEffect(() => {
    const onScroll = () => setHeaderVisible(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <div className={`${styles.headerSlot} ${headerVisible ? styles.headerVisible : ''}`}>
        <Header />
      </div>
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
        <ProfileSection />
      </section>
    </div>
  )
}
