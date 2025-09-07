/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = process.env.NEXT_PUBLIC_REPO_NAME
const base = ""

module.exports = {
  output: 'export',        
  images: { unoptimized: true },
  basePath: isProd && base ? base : undefined,
  assetPrefix: isProd && repo ? `/${repo}/` : undefined,
}