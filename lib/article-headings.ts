export interface ArticleHeading { title: string; id: string }

export function articleHeadingId(title: string): string {
  return title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

export function getArticleHeadings(body: string): ArticleHeading[] {
  const seen = new Map<string, number>()
  let fenced = false
  const headings: ArticleHeading[] = []
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue }
    if (fenced) continue
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const title = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`~]/g, '').trim()
    const base = articleHeadingId(title)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    headings.push({ title, id: count ? `${base}-${count + 1}` : base })
  }
  return headings
}
