// components/HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { Play, Info, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection({ movies }: { movies: any[] }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Get LATEST 5 movies (last 5 movies from the array for rotation)
  const featuredMovies = movies.slice(-5)

  // Auto-rotate movies every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie()
    }, 8000)

    return () => clearInterval(interval)
  }, [currentMovieIndex])

  const nextMovie = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMovieIndex((prev) => 
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      )
      setIsTransitioning(false)
    }, 500)
  }

  const prevMovie = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMovieIndex((prev) => 
        prev === 0 ? featuredMovies.length - 1 : prev - 1
      )
      setIsTransitioning(false)
    }, 500)
  }

  const currentMovie = featuredMovies[currentMovieIndex]

  if (!currentMovie) return null

  return (
    <section className="relative h-screen bg-cover bg-center overflow-hidden">
      {/* Background Image with Transition */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${currentMovie.thumbnail})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevMovie}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 transition-all"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </button>
      
      <button 
        onClick={nextMovie}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 transition-all"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </button>

      {/* Content */}
      <div className={`relative z-10 h-full flex items-center transition-transform duration-500 ${
        isTransitioning ? 'translate-x-4' : 'translate-x-0'
      }`}>
        <div className="container mx-auto px-3 md:px-4">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 text-white">
              {currentMovie.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 text-gray-200 line-clamp-2 md:line-clamp-3">
              {currentMovie.description}
            </p>
            
            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm lg:text-base">
              <span className="text-green-500 font-semibold">{currentMovie.rating}</span>
              <span>{currentMovie.releaseYear}</span>
              <span>{currentMovie.duration?.replace('PT', '').replace('H', 'h ').replace('M', 'm')}</span>
              <span className="border border-gray-400 px-1 md:px-2 py-0.5 md:py-1 text-xs rounded">{currentMovie.quality}</span>
            </div>

            {/* Action Buttons - Responsive Layout */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-4 md:mb-6">
              {/* Mobile: Compact buttons in grid */}
              <div className="grid grid-cols-2 gap-2 sm:hidden">
                <Link 
                  href={`/movie/${currentMovie.slug}`}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md font-semibold transition-colors group text-sm"
                >
                  <Play className="mr-1 group-hover:scale-110 transition-transform" size={16} />
                  Play
                </Link>
                <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md font-semibold transition-colors group text-sm">
                  <Info className="mr-1 group-hover:scale-110 transition-transform" size={16} />
                  Info
                </button>
                <a 
                  href="https://t.me/movieandtvshowondemand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="col-span-2 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md font-semibold transition-colors group text-sm"
                >
                  <MessageCircle className="mr-1 group-hover:scale-110 transition-transform" size={16} />
                  Request Movie
                </a>
              </div>

              {/* Desktop: Full buttons in row */}
              <div className="hidden sm:flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                <Link 
                  href={`/movie/${currentMovie.slug}`}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-colors group text-sm md:text-base"
                >
                  <Play className="mr-2 group-hover:scale-110 transition-transform md:w-5 md:h-5 lg:w-6 lg:h-6" size={18} />
                  Play Now
                </Link>
                <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-colors group text-sm md:text-base">
                  <Info className="mr-2 group-hover:scale-110 transition-transform md:w-5 md:h-5 lg:w-6 lg:h-6" size={18} />
                  More Info
                </button>
                <a 
                  href="https://t.me/movieandtvshowondemand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-colors group text-sm md:text-base"
                >
                  <MessageCircle className="mr-2 group-hover:scale-110 transition-transform md:w-5 md:h-5 lg:w-6 lg:h-6" size={18} />
                  Request Movie
                </a>
              </div>
            </div>

            {/* Service Description Banner - Responsive */}
            <div className="p-3 md:p-4 bg-black bg-opacity-70 rounded-lg border-l-4 border-red-600">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 md:gap-4 mb-2 md:mb-3">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-0">
                  🎬 On Demand & Request Any Movie 
                </h2>
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
              <p className="text-gray-200 text-xs md:text-sm lg:text-base">
                Can't find your movie? Request any movie via Telegram! 
                Send: <span className="text-yellow-400 font-semibold">Movie Name + Year + Language</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-1 md:gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {  
                setCurrentMovieIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentMovieIndex 
                ? 'bg-white scale-125' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent" />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}