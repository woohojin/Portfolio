import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getProject } from '../content/projects'
import { StickyHeader } from '../components/StickyHeader'
import { asset } from '../lib/asset'
import { useDarkMode } from '../contexts/DarkModeContext'
import styles from './ProjectDetail.module.css'

// 다크/라이트 배경 모두에서 잘 보이도록 색을 따로 만든 다이어그램들
const THEMED_DIAGRAMS = ['/img/dacoffee_jwt_sequence.svg', '/img/dacoffee_architecture.svg', '/img/dacoffee_erd.svg']

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProject(projectId) : undefined
  const { mode } = useDarkMode()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  if (!project || !project.hasDetailPage) {
    return <Navigate to="/" replace />
  }

  const isUrl = (value?: string) => !!value && /^https?:\/\//.test(value)

  return (
    <div>
      <StickyHeader />
      <main className={styles.content}>
        <Link to="/#projects" className={styles.back}>
          ← 목록으로
        </Link>

        {project.image && (
          <img className={styles.banner} src={asset(project.image)} alt={`${project.title} 스크린샷`} />
        )}

        <h1 className={styles.title}>{project.title}</h1>

        <div className={styles.meta}>
          <ul className={styles.techList}>
            {project.techStack.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          {(project.github || isUrl(project.website) || project.velog) && (
            <div className={styles.links}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {isUrl(project.website) && (
                <a href={project.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              )}
              {project.velog && (
                <a href={project.velog} target="_blank" rel="noreferrer">
                  Velog
                </a>
              )}
            </div>
          )}
        </div>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            ),
            img: ({ src, alt }) => {
              const resolved =
                typeof src === 'string' && mode === 'light' && THEMED_DIAGRAMS.includes(src)
                  ? src.replace(/\.svg$/, '-light.svg')
                  : src
              return (
                <img
                  src={typeof resolved === 'string' ? asset(resolved) : resolved}
                  alt={alt}
                  loading="lazy"
                  onError={event => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              )
            },
          }}
        >
          {project.body}
        </ReactMarkdown>
      </main>
    </div>
  )
}
