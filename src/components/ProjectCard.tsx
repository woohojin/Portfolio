import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { asset } from '../lib/asset'
import styles from './ProjectCard.module.css'

const isUrl = (value: string) => /^https?:\/\//.test(value)

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <div className={styles.card}>
      {project.image && <img className={styles.image} src={asset(project.image)} alt="" />}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      <ul className={styles.techList}>
        {project.techStack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {(project.github || (project.website && isUrl(project.website)) || project.velog) && (
        <div className={styles.links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
              GitHub
            </a>
          )}
          {project.website && isUrl(project.website) && (
            <a href={project.website} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
              Website
            </a>
          )}
          {project.velog && (
            <a href={project.velog} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
              Velog
            </a>
          )}
        </div>
      )}
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
