//   // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // experimental: {
//   //   appDir: true,
//   // },
//     images: {
//     domains: ['i.ibb.co', 'imgbb.com', 'short.icu'],
//     unoptimized: true
//   }
  
// } 

// module.exports = nextConfig
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ibb.co', 'imgbb.com', 'short.icu', 'i.ytimg.com', 'img.youtube.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, 
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ],
      },
    ]
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // trailingSlash: true,
}

module.exports = nextConfig