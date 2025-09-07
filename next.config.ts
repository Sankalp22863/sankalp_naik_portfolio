/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const base = ""

const config = {
  output: 'export',        
  images: { unoptimized: true },
  basePath: isProd && base ? base : undefined,
  assetPrefix: isProd && base ? `/${base}/` : undefined,
}


module.exports = config