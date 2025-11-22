// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = 'https://movieondemand.vercel.app'

export const metadata = {
  title: 'Movie On Demand - Request Any Movie via Telegram',
  description: 'Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language. We add requested movies within 24 hours.',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Movie On Demand - Request Any Movie via Telegram',
    description: 'Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language. We add requested movies within 24 hours.',
    url: baseUrl,
    siteName: 'Movie On Demand',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Movie On Demand - Request Any Movie via Telegram',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie On Demand - Request Any Movie via Telegram',
    description: 'Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Character Set */}
        <meta charSet="utf-8" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#e50914" />
        <meta name="msapplication-TileColor" content="#e50914" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e50914" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="movie on demand, request movies, telegram movie request, watch movies online, movie streaming, on demand movies" />
        <meta name="author" content="Movie On Demand" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="google-site-verification" content="YCq885c0NImaJxQH2uq4XPr2sUSQbti5uv2MPTa3Yrg" />
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Additional Open Graph Tags */}
        <meta property="og:site_name" content="Movie & Tvshow" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Movie & Tvshow - On Demand & Request Any Movie via Telegram" />
        
        {/* Additional Twitter Tags */}
        <meta name="twitter:image:alt" content="Movie & Tvshow - On Demand & Request Any Movie via Telegram" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Movie & Tvshow",
              "url": baseUrl,
              "description": "Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language. We add requested movies within 24 hours.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?query={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Movie & Tvshow",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/logo.png`
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DJ9EBBT26N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DJ9EBBT26N');
          `}
        </Script>
        
        {/* Additional Script 1 */}
        {/* <Script id="nap5k-script" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='10217362',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script> */}

        {/* Additional Script 2 */}
        {/* <Script id="groleegni-script" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='10217364',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script> */}

       
        {children}
        <Footer />
      </body>
    </html>
  )
}