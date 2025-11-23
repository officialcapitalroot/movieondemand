  // next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
    images: {
    domains: ['i.ibb.co', 'imgbb.com', 'api.telegram.org', 'movieondemand.vercel.app', 'short.icu'],
    unoptimized: true
  },
  trailingSlash: true,
}

module.exports = nextConfig