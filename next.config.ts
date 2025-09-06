/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = process.env.NEXT_PUBLIC_REPO_NAME // e.g. "sankalp-portfolio"

// If deploying to https://USERNAME.github.io/REPO_NAME use basePath/assetPrefix.
// If deploying to https://USERNAME.github.io (user/organization site), leave both undefined.
const REPO = process.env.NEXT_PUBLIC_REPO_NAME // e.g. "my-portfolio" (optional)

module.exports = {
  output: 'export',                // enables `next export`
  images: { unoptimized: true },   // Next/Image works on static hosts
  basePath: isProd && repo ? `/${repo}` : undefined,
  assetPrefix: isProd && repo ? `/${repo}/` : undefined,
}
