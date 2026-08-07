import { parseFrontmatter } from '../lib/frontmatter'

export interface Project {
  id: string
  title: string
  summary: string
  techStack: string[]
  github?: string
  website?: string
  adminWebsite?: string
  velog?: string
  erdCloud?: string
  image?: string
  hasDetailPage: boolean
  body: string
}

const modules = import.meta.glob('./projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function toProject(id: string, raw: string): Project {
  const { data, body } = parseFrontmatter(raw)
  return {
    id,
    title: data.title ?? id,
    summary: data.summary ?? '',
    techStack: data.techStack ? data.techStack.split(',').map(s => s.trim()) : [],
    github: data.github || undefined,
    website: data.website || undefined,
    adminWebsite: data.adminWebsite || undefined,
    velog: data.velog || undefined,
    erdCloud: data.erdCloud || undefined,
    image: data.image || undefined,
    hasDetailPage: data.hasDetailPage === 'true',
    body,
  }
}

let cache: Project[] | undefined

export function getAllProjects(): Project[] {
  if (!cache) {
    cache = Object.entries(modules).map(([path, raw]) => {
      const id = path.split('/').pop()!.replace(/\.md$/, '')
      return toProject(id, raw)
    })
  }
  return cache
}

export function getProject(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id)
}
