import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { asset } from '../lib/asset'
import styles from './ProjectCard.module.css'

const isUrl = (value: string) => /^https?:\/\//.test(value)

export function ProjectCard({ project }: { project: Project }) {
  const info = project.hasDetailPage ? (
    <Link to={`/${project.id}`} className={styles.link}>
      {project.image && <img className={styles.image} src={asset(project.image)} alt="" />}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
    </Link>
  ) : (
    <>
      {project.image && <img className={styles.image} src={asset(project.image)} alt="" />}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
    </>
  )

  return (
    <div className={styles.card}>
      {info}
      <ul className={styles.techList}>
        {project.techStack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {(project.github ||
        project.erdCloud ||
        (project.website && isUrl(project.website)) ||
        project.adminWebsite ||
        project.velog) && (
        <div className={styles.links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {project.erdCloud && (
            <a href={project.erdCloud} target="_blank" rel="noreferrer">
              ERD Cloud
            </a>
          )}
          {project.website && isUrl(project.website) && (
            <a href={project.website} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
          {project.adminWebsite && (
            <a href={project.adminWebsite} target="_blank" rel="noreferrer">
              Admin
            </a>
          )}
          {project.velog && (
            <a href={project.velog} target="_blank" rel="noreferrer">
              Velog
            </a>
          )}
        </div>
      )}
      {project.hasDetailPage && (
        <Link to={`/${project.id}`} className={styles.more}>
          자세히 보기 →
        </Link>
      )}
    </div>
  )
}
