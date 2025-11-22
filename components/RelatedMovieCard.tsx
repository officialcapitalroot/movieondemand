// // components/RelatedMovieCard.tsx
// 'use client'

// import Link from 'next/link'
// import Image from 'next/image'
// import { Play } from 'lucide-react'

// export default function RelatedMovieCard({ movie }: { movie: any }) {
//   return (
//     <div className="group cursor-pointer">
//       <Link href={`/movie/${movie.slug}`} className="block">
//         <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 transition-all duration-300 group-hover:scale-105">
//           <Image
//             src={movie.thumbnail}
//             alt={`Watch ${movie.title} - ${movie.genre}`}
//             fill
//             sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
//             className="object-cover transition-transform duration-300 group-hover:scale-110"
//             priority={false}
//           />
          
//           {/* Hover Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//             <div className="transform transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
//               <div className="bg-red-600 rounded-full p-3 shadow-2xl border-2 border-white">
//                 <Play size={18} className="text-white ml-0.5" />
//               </div>
//             </div>
//           </div>

//           {/* Quality Badge */}
//           <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
//             {movie.quality}
//           </div>
//         </div>
//       </Link>

//       {/* Movie Info */}
//       <div className="mt-3">
//         <Link 
//           href={`/movie/${movie.slug}`}
//           className="block"
//         >
//           <h3 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-red-400 transition-colors">
//             {movie.title}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between mt-1">
//           <span className="text-gray-400 text-xs">
//             {movie.releaseYear}
//           </span>
//           <span className="text-green-500 text-xs font-semibold">
//             {movie.rating}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }





// components/RelatedMovieCard.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock, Star } from 'lucide-react'

interface Movie {
  id: string;
  videoId: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  releaseYear: string;
  rating: string;
  genre: string;
  quality: string;
  duration: string;
  category: string;
  cast: string[];
}

interface RelatedMovieCardProps {
  movie: Movie;
  currentMovieId?: string;
  autoRotate?: boolean;
  rotationInterval?: number;
}

export default function RelatedMovieCard({ 
  movie, 
  currentMovieId,
  autoRotate = false,
  rotationInterval = 5000 
}: RelatedMovieCardProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([movie])

  // Load all movies for rotation
  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const response = await fetch('/api/movies')
        const allMovies = await response.json()
        
        // Filter out current movie and get random selection
        const filteredMovies = allMovies
          .filter((m: Movie) => m.id !== currentMovieId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12) // Show 12 related movies max
        
        setRelatedMovies([movie, ...filteredMovies])
      } catch (error) {
        console.error('Failed to load movies:', error)
        setRelatedMovies([movie])
      }
    }

    if (autoRotate) {
      loadAllMovies()
    }
  }, [movie, currentMovieId, autoRotate])

  // Auto-rotate related movies
  useEffect(() => {
    if (!autoRotate || relatedMovies.length <= 1) return

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentMovieIndex(prev => 
          prev === relatedMovies.length - 1 ? 0 : prev + 1
        )
      }
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, relatedMovies.length, isHovered, rotationInterval])

  const currentMovie = relatedMovies[currentMovieIndex]

  if (!currentMovie) return null

  return (
    <div 
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href={`/movie/${currentMovie.slug}`}
        className="block relative"
        aria-label={`Watch ${currentMovie.title} - ${currentMovie.genre}`}
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
          {/* Main Image */}
          <Image
            src={currentMovie.thumbnail}
            alt={`Watch ${currentMovie.title} - ${currentMovie.genre}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={currentMovieIndex === 0}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl border-2 border-white transition-all duration-300 hover:scale-110">
              <Play size={20} className="text-white ml-0.5" />
            </div>
          </div>

          {/* Top Info Bar */}
          <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between text-xs text-white">
              <span className="font-semibold truncate">{currentMovie.title}</span>
              <span className="bg-black/80 px-1 rounded">{currentMovie.quality}</span>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center space-x-1">
                <Star size={10} className="text-yellow-400 fill-current" />
                <span>{currentMovie.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={10} />
                <span>{formatDuration(currentMovie.duration)}</span>
              </div>
            </div>
          </div>

          {/* Rotation Indicator */}
          {autoRotate && relatedMovies.length > 1 && (
            <div className="absolute top-2 left-2 flex space-x-1">
              {relatedMovies.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    index === currentMovieIndex 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Movie Info Below Card */}
      <div className="mt-3 px-1">
        <Link 
          href={`/movie/${currentMovie.slug}`}
          className="block group"
        >
          <h3 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-red-400 transition-colors duration-200">
            {currentMovie.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>{currentMovie.releaseYear}</span>
          <div className="flex items-center space-x-1">
            <span className="text-green-500 font-semibold">{currentMovie.rating}</span>
            <span>•</span>
            <span className="truncate max-w-[80px]">{currentMovie.genre.split(',')[0]}</span>
          </div>
        </div>

        {/* Cast Preview */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 line-clamp-1">
            Starring: {currentMovie.cast.slice(0, 2).join(', ')}
            {currentMovie.cast.length > 2 && '...'}
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex space-x-2 bg-black/90 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-700">
          <Link
            href={`/movie/${currentMovie.slug}`}
            className="text-xs text-white hover:text-red-400 transition-colors font-medium"
          >
            Watch Now
          </Link>
          <span className="text-gray-600">|</span>
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Add to watchlist functionality
              console.log('Add to watchlist:', currentMovie.title)
            }}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper function to format duration
function formatDuration(duration: string) {
  if (!duration) return 'N/A'
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return duration
  
  const hours = match[1] ? `${match[1]}h` : ''
  const minutes = match[2] ? `${match[2]}m` : ''
  
  return `${hours} ${minutes}`.trim() || 'N/A'
}

// Additional component for grid layout
export function RelatedMoviesGrid({ 
  movies, 
  currentMovieId,
  title = "You May Also Like",
  autoRotate = false 
}: { 
  movies: Movie[];
  currentMovieId?: string;
  title?: string;
  autoRotate?: boolean;
}) {
  // Filter out current movie and get limited set
  const filteredMovies = movies
    .filter(movie => movie.id !== currentMovieId)
    .slice(0, 6)

  if (filteredMovies.length === 0) return null

  return (
    <section className="mb-12" aria-labelledby="related-movies-heading">
      <h2 id="related-movies-heading" className="text-2xl font-bold text-white mb-6">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredMovies.map((movie) => (
          <RelatedMovieCard
            key={movie.id}
            movie={movie}
            currentMovieId={currentMovieId}
            autoRotate={autoRotate}
          />
        ))}
      </div>
    </section>
  )
}