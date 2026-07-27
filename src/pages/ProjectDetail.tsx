import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getProject } from '../content/projects'
import { Header } from '../components/Header'
import styles from './ProjectDetail.module.css'

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProject(projectId) : undefined

  if (!project || !project.hasDetailPage) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <Header />
      <main className={styles.content}>
        <Link to="/#projects" className={styles.back}>
          ← 목록으로
        </Link>
        <h1>{project.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.body}</ReactMarkdown>
      </main>
    </div>
  )
}
