import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  async headers() {
    return [
      {
        // Static SEO files must stay fetchable by Googlebot. If middleware is
        // added later, exclude /sitemap.xml, /robots.txt, and *.xml from the matcher.
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
