// app/search/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { Search, Filter, X } from 'lucide-react'
import moviesData from '../../data/data.json'

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

// Type assertion for moviesData
const typedMoviesData = moviesData as Movie[]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    category: '',
    rating: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const filterOptions = useMemo(() => {
    // Use Array.from instead of spread operator for Set
    const genres = Array.from(new Set(typedMoviesData.flatMap(movie => movie.genre.split(', '))))
    const years = Array.from(new Set(typedMoviesData.map(movie => movie.releaseYear))).sort().reverse()
    const categories = Array.from(new Set(typedMoviesData.map(movie => movie.category)))
    
    return { genres, years, categories }
  }, [])

  const filteredMovies = useMemo(() => {
    return typedMoviesData.filter(movie => {
      const matchesSearch = query === '' || 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase())) ||
        movie.genre.toLowerCase().includes(query.toLowerCase())

      const matchesGenre = filters.genre === '' || 
        movie.genre.includes(filters.genre)
      
      const matchesYear = filters.year === '' || 
        movie.releaseYear === filters.year
      
      const matchesCategory = filters.category === '' || 
        movie.category === filters.category

      return matchesSearch && matchesGenre && matchesYear && matchesCategory
    })
  }, [query, filters])

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: '',
      category: '',
      rating: ''
    })
  }

  return (
    <>
      <Header />
      <main className="search-container">
        <div className="container">
          <h1 className="hero-title mb-8">Search Movies</h1>
          
          {/* Search Bar */}
          <div className="search-input-container">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies by title, actor, genre..."
                className="search-input focus-ring"
              />
              <Search className="search-icon" size={24} />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle focus-ring"
            >
              <Filter className="mr-2" size={20} />
              Filters
              {(filters.genre || filters.year || filters.category) && (
                <span className="ml-2 bg-netflix-red text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>

            {(filters.genre || filters.year || filters.category) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-gray-400 hover:text-white transition"
              >
                <X className="mr-1" size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              {/* Genre Filter */}
              <div>
                <label className="filter-label">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                  className="filter-select focus-ring"
                >
                  <option value="">All Genres</option>
                  {filterOptions.genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="filter-label">Release Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="filter-select focus-ring"
                >
                  <option value="">All Years</option>
                  {filterOptions.years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="filter-label">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="filter-select focus-ring"
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="filter-label">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                  className="filter-select focus-ring"
                >
                  <option value="">Any Rating</option>
                  <option value="7">7+/10</option>
                  <option value="6">6+/10</option>
                  <option value="5">5+/10</option>
                </select>
              </div>
            </div>
          )}

          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title">
                {query || Object.values(filters).some(f => f) ? 'Search Results' : 'All Movies'}
              </h2>
              <p className="results-count">
                {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
              </p>
            </div>

            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}