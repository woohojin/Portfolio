import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <div className={styles.card}>
      {project.image && <img className={styles.image} src={project.image} alt="" />}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      <ul className={styles.techList}>
        {project.techStack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.hasDetailPage && <span className={styles.more}>자세히 보기 →</span>}
    </div>
  )

  if (!project.hasDetailPage) {
    return card
  }

  return (
    <Link to={`/${project.id}`} className={styles.link}>
      {card}
    </Link>
  )
}
