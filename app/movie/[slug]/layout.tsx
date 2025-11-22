// import type { Metadata } from 'next'
// import moviesData from '../../../data/data.json'

// interface Movie {
//   id: string
//   slug: string
//   title: string
//   description: string
//   thumbnail: string
//   videoId: string
//   videoSource?: string
//   releaseYear: string
//   duration: string
//   quality: string
//   rating: string
//   language: string
//   genre: string
//   category: string
//   director: string
//   cast: string[]
//   country: string
//   size: string
//   tags: string[]
//   uploadDate: string
// }

// const typedMoviesData = moviesData as Movie[]

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const movie = typedMoviesData.find((m: Movie) => m.slug === params.slug)
  
//   if (!movie) {
//     return {
//       title: 'Movie Not Found',
//       description: 'Movie not found',
//     }
//   }

//   const pageTitle = `${movie.title} (${movie.releaseYear}) - Watch Online Free`
//   const pageDescription = movie.description.length > 160 ? movie.description.substring(0, 160) + '...' : movie.description

//   return {
//     title: pageTitle,
//     description: pageDescription,
//     keywords: movie.tags.join(', '),
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//       images: [
//         {
//           url: movie.thumbnail,
//           width: 1200,
//           height: 630,
//           alt: `Movie poster for ${movie.title}`,
//         },
//       ],
//       type: 'video.movie',
//       url: `https://movieondemand.vercel.app/movie/${movie.slug}`,
//       siteName: 'Movie On Demand',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: pageTitle,
//       description: pageDescription,
//       images: [movie.thumbnail],
//       creator: '@movieondemand',
//     },
//     robots: 'index, follow',
//   }
// }

// export default function MovieLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return children
// }









































// import type { Metadata } from 'next'
// import moviesData from '../../../data/data.json'

// interface Movie {
//   id: string
//   slug: string
//   title: string
//   description: string
//   thumbnail: string
//   videoId: string
//   videoSource?: string
//   releaseYear: string
//   duration: string
//   quality: string
//   rating: string
//   language: string
//   genre: string
//   category: string
//   director: string
//   cast: string[]
//   country: string
//   size: string
//   tags: string[]
//   uploadDate: string
// }

// const typedMoviesData = moviesData as Movie[]
// const SITE_URL = "https://movieondemand.vercel.app"

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const movie = typedMoviesData.find((m: Movie) => m.slug === params.slug)
  
//   if (!movie) {
//     return {
//       title: 'Movie Not Found',
//       description: 'Movie not found',
//     }
//   }

//   const pageTitle = `${movie.title} (${movie.releaseYear}) - Watch Online Free`
//   const pageDescription = movie.description.length > 160 ? movie.description.substring(0, 160) + '...' : movie.description
  
//   // Ensure thumbnail URL is absolute
//   const thumbnailUrl = movie.thumbnail.startsWith('http') 
//     ? movie.thumbnail 
//     : `${SITE_URL}${movie.thumbnail.startsWith('/') ? '' : '/'}${movie.thumbnail}`

//   return {
//     title: pageTitle,
//     description: pageDescription,
//     keywords: movie.tags.join(', '),
//     metadataBase: new URL(SITE_URL),
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//       images: [
//         {
//           url: thumbnailUrl,
//           width: 384, // Your actual image width
//           height: 576, // Your actual image height
//           alt: `Movie poster for ${movie.title}`,
//           type: 'image/jpeg',
//         },
//       ],
//       type: 'website', // Changed from 'video.movie' to 'website' for better compatibility
//       url: `${SITE_URL}/movie/${movie.slug}`,
//       siteName: 'Movie On Demand',
//       locale: 'en_US',
//     },
//     twitter: {
//       card: 'summary', // Changed to 'summary' for vertical images
//       title: pageTitle,
//       description: pageDescription,
//       images: [thumbnailUrl],
//       creator: '@movieondemand',
//       site: '@movieondemand',
//     },
//     robots: 'index, follow',
//     alternates: {
//       canonical: `${SITE_URL}/movie/${movie.slug}`
//     },
//   }
// }

// export default function MovieLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return children
// }




import type { Metadata } from 'next'
import moviesData from '../../../data/data.json'

interface Movie {
  id: string
  slug: string
  title: string
  description: string
  thumbnail: string
  videoId: string
  videoSource?: string
  releaseYear: string
  duration: string
  quality: string
  rating: string
  language: string
  genre: string
  category: string
  director: string
  cast: string[]
  country: string
  size: string
  tags: string[]
  uploadDate: string
}

const typedMoviesData = moviesData as Movie[]
const SITE_URL = "https://movieondemand.vercel.app"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const movie = typedMoviesData.find((m: Movie) => m.slug === params.slug)
  
  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'Movie not found',
    }
  }

  const pageTitle = `${movie.title} (${movie.releaseYear}) - Watch Online Free`
  const pageDescription = movie.description.length > 160 ? movie.description.substring(0, 160) + '...' : movie.description
  
  // FIXED: Properly handle thumbnail URL - ensure it's absolute and properly formatted
  let thumbnailUrl = movie.thumbnail
  
  // If thumbnail is relative path, make it absolute
  if (!thumbnailUrl.startsWith('http')) {
    thumbnailUrl = `${SITE_URL}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`
  }
  
  // FIXED: Ensure proper image dimensions and type
  const images = [
    {
      url: thumbnailUrl,
      width: 800,
      height: 600,
      alt: `Poster for ${movie.title} (${movie.releaseYear})`,
      type: 'image/jpeg' as const,
    },
    {
      url: thumbnailUrl,
      width: 1200,
      height: 630,
      alt: `Poster for ${movie.title} (${movie.releaseYear})`,
      type: 'image/jpeg' as const,
    }
  ]

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: movie.tags.join(', '),
    metadataBase: new URL(SITE_URL),
    
    // FIXED: Enhanced OpenGraph tags
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: images,
      type: 'website',
      url: `${SITE_URL}/movie/${movie.slug}`,
      siteName: 'Movie On Demand',
      locale: 'en_US',
      // Added additional OpenGraph properties
      determiner: 'the',
      countryName: movie.country,
      videos: movie.videoId ? [
        {
          url: `https://www.youtube.com/watch?v=${movie.videoId}`,
          type: 'video/mp4',
          width: 1280,
          height: 720,
          alt: `Trailer for ${movie.title}`,
        }
      ] : undefined,
    },
    
    // FIXED: Enhanced Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [thumbnailUrl],
      creator: '@movieondemand',
      site: '@movieondemand',
      // Additional Twitter properties
      player: movie.videoId ? {
        url: `https://www.youtube.com/embed/${movie.videoId}`,
        width: 1280,
        height: 720,
        streamUrl: `https://www.youtube.com/watch?v=${movie.videoId}`,
      } : undefined,
    },
    
    // FIXED: Additional metadata
    robots: 'index, follow, max-image-preview:large',
    alternates: {
      canonical: `${SITE_URL}/movie/${movie.slug}`
    },
    
    // FIXED: Additional properties for better social media sharing
    other: {
      'og:updated_time': new Date().toISOString(),
      'og:see_also': `${SITE_URL}`,
      'twitter:label1': 'Genre',
      'twitter:data1': movie.genre,
      'twitter:label2': 'Rating',
      'twitter:data2': movie.rating,
      'twitter:label3': 'Duration', 
      'twitter:data3': movie.duration,
    }
  }
}

// FIXED: Generate static params for better SEO
export async function generateStaticParams() {
  return typedMoviesData.map((movie) => ({
    slug: movie.slug,
  }))
}

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}