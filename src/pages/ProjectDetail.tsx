import { useParams } from 'react-router-dom'

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  return <div>Project detail placeholder for: {projectId}</div>
}
