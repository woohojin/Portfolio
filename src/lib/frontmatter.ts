export interface ParsedMarkdown {
  data: Record<string, string>
  body: string
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: raw }
  }
  const [, frontmatterBlock, body] = match
  const data: Record<string, string> = {}
  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    data[key] = value
  }
  return { data, body: body.trim() }
}
