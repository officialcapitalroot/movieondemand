
// components/MovieCard.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

import { MessageCircle } from 'lucide-react'
export default function MovieCard({ movie }: { movie: any }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.slug}`}>
        <div className={`aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-2xl' : ''
        }`}>
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Clean Hover Overlay - No Background */}
          {isHovered && (
            <>
              {/* Top Gradient for Title */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
              
              {/* Bottom Gradient for Play Button */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
              
              {/* Movie Title - Top */}
              <div className="absolute top-2 left-2 right-2">
                <h3 className="text-white font-bold text-sm drop-shadow-2xl line-clamp-2">
                  {movie.title}
                </h3>
              </div>

              {/* Play Button - Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform transition-all duration-300 group-hover:scale-110">
                 
                 <a 
                  href="https://t.me/movieandtvshowondemand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-semibold transition-colors group text-sm whitespace-nowrap w-full sm:w-auto"
                >
                  <MessageCircle className="mr-1 md:mr-2 group-hover:scale-110 transition-transform md:w-4 md:h-4 lg:w-5 lg:h-5" size={16} />
                  Request Movie
                </a>
                </div>
              </div>
            </>
          )}
        </div>
      </Link>

      {/* Movie Title (Always visible below card) */}
      <div className="mt-2">
        <h3 className="text-white text-sm font-medium line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {movie.releaseYear} • {movie.genre.split(',')[0]}
        </p>
      </div>
    </div>
  )
}