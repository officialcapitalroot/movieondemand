

// // app/admin/page.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { Save, Plus, Trash2, Edit } from 'lucide-react'

// interface Movie {
//   id: string
//   videoId: string
//   slug: string
//   videoSource: string
//   title: string
//   description: string
//   thumbnail: string
//   uploadDate: string
//   viewCount: number
//   duration: string
//   Language: string
//   category: string
//   tags: string[]
//   director: string
//   cast: string[]
//   genre: string
//   rating: string
//   releaseYear: string
//   country: string
//   quality: string
//   size: string
//   language: string
//   subtitles: string
// }

// export default function AdminPanel() {
//   const [movies, setMovies] = useState<Movie[]>([])
//   const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadMovies()
//   }, [])

//   const loadMovies = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch('/api/movies')
//       if (!response.ok) {
//         throw new Error('Failed to fetch movies')
//       }
//       const data = await response.json()
//       if (data.success) {
//         setMovies(data.movies)
//       } else {
//         console.error('Error loading movies:', data.error)
//         alert('Error loading movies: ' + data.error)
//       }
//     } catch (error) {
//       console.error('Error loading movies:', error)
//       alert('Error loading movies. Check console for details.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (password === 'admin123') {
//       setIsAuthenticated(true)
//     } else {
//       alert('Wrong password! Use: admin123')
//     }
//   }

//   const handleSave = async (movieData: Movie) => {
//     try {
//       const method = movieData.id ? 'PUT' : 'POST'
//       const response = await fetch('/api/movies', {
//         method: method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movieData),
//       })

//       const result = await response.json()
      
//       if (result.success) {
//         setMovies(result.movies)
//         setEditingMovie(null)
//         alert('Movie saved successfully!')
//       } else {
//         alert('Error saving movie: ' + result.error)
//       }
//     } catch (error) {
//       console.error('Error saving movie:', error)
//       alert('Error saving movie')
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure you want to delete this movie?')) {
//       try {
//         const response = await fetch('/api/movies', {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id }),
//         })

//         const result = await response.json()
        
//         if (result.success) {
//           setMovies(result.movies)
//           alert('Movie deleted successfully!')
//         } else {
//           alert('Error deleting movie: ' + result.error)
//         }
//       } catch (error) {
//         console.error('Error deleting movie:', error)
//         alert('Error deleting movie')
//       }
//     }
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-netflix-black flex items-center justify-center">
//         <form onSubmit={handleLogin} className="bg-netflix-gray p-8 rounded-lg max-w-md w-full">
//           <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter admin password (admin123)"
//             className="w-full p-3 rounded bg-black text-white mb-4 border border-gray-600"
//           />
//           <button type="submit" className="w-full bg-netflix-red py-3 rounded hover:bg-red-700 transition text-white">
//             Login
//           </button>
//           <p className="text-gray-400 text-sm mt-4">Password: admin123</p>
//         </form>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-netflix-black p-8">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
//           <div className="flex gap-4">
//             <button
//               onClick={loadMovies}
//               className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition text-white"
//             >
//               Refresh Movies
//             </button>
//             <button
//               onClick={() => setEditingMovie({
//                 id: '',
//                 videoId: '',
//                 slug: '',
//                 videoSource: 'shorticu',
//                 title: '',
//                 description: '',
//                 thumbnail: '',
//                 uploadDate: new Date().toISOString(),
//                 viewCount: 0,
//                 duration: '',
//                 Language: '',
//                 category: '',
//                 tags: [],
//                 director: '',
//                 cast: [],
//                 genre: '',
//                 rating: '',
//                 releaseYear: '',
//                 country: '',
//                 quality: 'HD 1080p',
//                 size: '',
//                 language: '',
//                 subtitles: 'N/A'
//               })}
//               className="flex items-center bg-netflix-red px-4 py-2 rounded hover:bg-red-700 transition text-white"
//             >
//               <Plus className="mr-2" size={20} />
//               Add Movie
//             </button>
//           </div>
//         </div>

//         {/* Movie Form */}
//         {editingMovie && (
//           <MovieForm
//             movie={editingMovie}
//             onSave={handleSave}
//             onCancel={() => setEditingMovie(null)}
//           />
//         )}

//         {/* Movies List */}
//         {isLoading ? (
//           <div className="text-white text-center">Loading movies...</div>
//         ) : (
//           <div className="grid gap-4">
//             {movies.length === 0 ? (
//               <div className="text-white text-center">No movies found. Add some movies or check your data.json file.</div>
//             ) : (
//               movies.map((movie) => (
//                 <div key={movie.id} className="bg-netflix-gray p-4 rounded flex justify-between items-center">
//                   <div className="flex items-center space-x-4">
//                     <img 
//                       src={movie.thumbnail} 
//                       alt={movie.title}
//                       className="w-16 h-12 object-cover rounded"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x45?text=No+Image'
//                       }}
//                     />
//                     <div>
//                       <h3 className="font-semibold text-white">{movie.title}</h3>
//                       <p className="text-sm text-gray-400">{movie.genre} • {movie.category}</p>
//                       <p className="text-xs text-gray-500">ID: {movie.id} • Slug: {movie.slug}</p>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setEditingMovie(movie)}
//                       className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition text-white"
//                       title="Edit"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(movie.id)}
//                       className="p-2 bg-red-500 rounded hover:bg-red-600 transition text-white"
//                       title="Delete"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function MovieForm({ movie, onSave, onCancel }: { movie: Movie, onSave: (movie: Movie) => void, onCancel: () => void }) {
//   const [formData, setFormData] = useState<Movie>(movie)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
    
//     // Convert string fields to arrays and ensure proper types
//     const processedData: Movie = {
//       ...formData,
//       tags: typeof formData.tags === 'string' ? 
//         formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : 
//         formData.tags,
//       cast: typeof formData.cast === 'string' ? 
//         formData.cast.split(',').map(actor => actor.trim()).filter(actor => actor) : 
//         formData.cast,
//       viewCount: typeof formData.viewCount === 'string' ? 
//         parseInt(formData.viewCount) || 0 : 
//         formData.viewCount
//     }
    
//     onSave(processedData)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-netflix-gray p-6 rounded-lg mb-8">
//       <h3 className="text-xl font-semibold mb-4 text-white">
//         {movie.id ? 'Edit Movie' : 'Add New Movie'}
//       </h3>
      
//       <div className="grid md:grid-cols-2 gap-4">
//         {/* Basic Information */}
//         {!movie.id && (
//           <input
//             type="text"
//             placeholder="ID (auto-generated if empty)"
//             value={formData.id}
//             onChange={(e) => setFormData({...formData, id: e.target.value})}
//             className="p-3 rounded bg-black text-white border border-gray-600"
//           />
//         )}
//         <input
//           type="text"
//           placeholder="Video ID"
//           value={formData.videoId}
//           onChange={(e) => setFormData({...formData, videoId: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Slug"
//           value={formData.slug}
//           onChange={(e) => setFormData({...formData, slug: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <select
//           value={formData.videoSource}
//           onChange={(e) => setFormData({...formData, videoSource: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         >
//           <option value="shorticu">Shorticu</option>
//           <option value="dailymotion">Dailymotion</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Title"
//           value={formData.title}
//           onChange={(e) => setFormData({...formData, title: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={formData.description}
//           onChange={(e) => setFormData({...formData, description: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
//           rows={3}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Thumbnail URL"
//           value={formData.thumbnail}
//           onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
//           required
//         />

//         {/* Movie Details */}
//         <input
//           type="datetime-local"
//           value={formData.uploadDate.slice(0, 16)}
//           onChange={(e) => setFormData({...formData, uploadDate: new Date(e.target.value).toISOString()})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="number"
//           placeholder="View Count"
//           value={formData.viewCount}
//           onChange={(e) => setFormData({...formData, viewCount: parseInt(e.target.value) || 0})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Duration (PT1H09M3S)"
//           value={formData.duration}
//           onChange={(e) => setFormData({...formData, duration: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Language"
//           value={formData.Language}
//           onChange={(e) => setFormData({...formData, Language: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={formData.category}
//           onChange={(e) => setFormData({...formData, category: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Genre"
//           value={formData.genre}
//           onChange={(e) => setFormData({...formData, genre: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Rating (6.5/10)"
//           value={formData.rating}
//           onChange={(e) => setFormData({...formData, rating: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Release Year"
//           value={formData.releaseYear}
//           onChange={(e) => setFormData({...formData, releaseYear: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Country"
//           value={formData.country}
//           onChange={(e) => setFormData({...formData, country: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Quality (HD 1080p)"
//           value={formData.quality}
//           onChange={(e) => setFormData({...formData, quality: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Size (1.9 GB)"
//           value={formData.size}
//           onChange={(e) => setFormData({...formData, size: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Language (Country)"
//           value={formData.language}
//           onChange={(e) => setFormData({...formData, language: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Subtitles (N/A)"
//           value={formData.subtitles}
//           onChange={(e) => setFormData({...formData, subtitles: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />

//         {/* Arrays */}
//         <input
//           type="text"
//           placeholder="Tags (comma separated)"
//           value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
//           onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim())})}
//           className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
//         />
//         <input
//           type="text"
//           placeholder="Director"
//           value={formData.director}
//           onChange={(e) => setFormData({...formData, director: e.target.value})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Cast (comma separated)"
//           value={Array.isArray(formData.cast) ? formData.cast.join(', ') : formData.cast}
//           onChange={(e) => setFormData({...formData, cast: e.target.value.split(',').map(actor => actor.trim())})}
//           className="p-3 rounded bg-black text-white border border-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4 mt-6">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-6 py-2 bg-gray-500 rounded hover:bg-gray-600 transition text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="flex items-center px-6 py-2 bg-netflix-red rounded hover:bg-red-700 transition text-white"
//         >
//           <Save className="mr-2" size={20} />
//           Save Movie
//         </button>
//       </div>
//     </form>
//   )
// }










// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react'

interface Movie {
  id: string
  videoId: string
  slug: string
  videoSource: string
  title: string
  description: string
  thumbnail: string
  uploadDate: string
  viewCount: number
  duration: string
  Language: string
  category: string
  tags: string[]
  director: string
  cast: string[]
  genre: string
  rating: string
  releaseYear: string
  country: string
  quality: string
  size: string
  language: string
  subtitles: string
}

export default function AdminPanel() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [expandedMovieId, setExpandedMovieId] = useState<string | null>(null)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/movies')
      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json()
      if (data.success) {
        setMovies(data.movies.reverse())
      } else {
        console.error('Error loading movies:', data.error)
        alert('Error loading movies: ' + data.error)
      }
    } catch (error) {
      console.error('Error loading movies:', error)
      alert('Error loading movies. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Wrong password! Use: admin123')
    }
  }

  const handleSave = async (movieData: Movie) => {
    try {
      const method = movieData.id ? 'PUT' : 'POST'
      const response = await fetch('/api/movies', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      })

      const result = await response.json()
      
      if (result.success) {
        setMovies(result.movies.reverse())
        setEditingMovie(null)
        setExpandedMovieId(null)
        alert('Movie saved successfully!')
      } else {
        alert('Error saving movie: ' + result.error)
      }
    } catch (error) {
      console.error('Error saving movie:', error)
      alert('Error saving movie')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch('/api/movies', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })

        const result = await response.json()
        
        if (result.success) {
          setMovies(result.movies.reverse())
          setExpandedMovieId(null)
          alert('Movie deleted successfully!')
        } else {
          alert('Error deleting movie: ' + result.error)
        }
      } catch (error) {
        console.error('Error deleting movie:', error)
        alert('Error deleting movie')
      }
    }
  }

  const toggleExpand = (movieId: string) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId)
  }

  const handleAddNewMovie = () => {
    const newMovie = {
      id: '',
      videoId: '',
      slug: '',
      videoSource: 'shorticu',
      title: '',
      description: '',
      thumbnail: '',
      uploadDate: new Date().toISOString(),
      viewCount: 0,
      duration: '',
      Language: '',
      category: '',
      tags: [],
      director: '',
      cast: [],
      genre: '',
      rating: '',
      releaseYear: '',
      country: '',
      quality: 'HD 1080p',
      size: '',
      language: '',
      subtitles: 'N/A'
    }
    setEditingMovie(newMovie)
    setExpandedMovieId('new')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password (admin123)"
            className="w-full p-3 rounded bg-black text-white mb-4 border border-gray-600"
          />
          <button type="submit" className="w-full bg-red-600 py-3 rounded hover:bg-red-700 transition text-white">
            Login
          </button>
          <p className="text-gray-400 text-sm mt-4">Password: admin123</p>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button
              onClick={loadMovies}
              className="flex items-center justify-center bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition text-white text-sm"
            >
              Refresh Movies
            </button>
            <button
              onClick={handleAddNewMovie}
              className="flex items-center justify-center bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition text-white text-sm"
            >
              <Plus className="mr-2" size={16} />
              Add New Movie
            </button>
          </div>
        </div>

        {/* Add/Edit Movie Form */}
        {editingMovie && (
          <div className="mb-6">
            <MovieForm
              movie={editingMovie}
              onSave={handleSave}
              onCancel={() => {
                setEditingMovie(null)
                setExpandedMovieId(null)
              }}
            />
          </div>
        )}

        {/* Movies List with Accordion */}
        {isLoading ? (
          <div className="text-white text-center py-8">Loading movies...</div>
        ) : (
          <div className="space-y-4">
            {movies.length === 0 ? (
              <div className="text-white text-center py-8 bg-gray-800 rounded-lg">
                No movies found. Add some movies or check your data.json file.
              </div>
            ) : (
              movies.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  {/* Movie Header - Always Visible */}
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => toggleExpand(movie.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <img 
                        src={movie.thumbnail} 
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x120?text=No+Image'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                        <p className="text-sm text-gray-400 truncate">
                          {movie.genre} • {movie.category} • {movie.releaseYear}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          ID: {movie.id} • Slug: {movie.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingMovie(movie)
                          setExpandedMovieId(movie.id)
                        }}
                        className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition text-white"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(movie.id)
                        }}
                        className="p-2 bg-red-500 rounded hover:bg-red-600 transition text-white"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                      {expandedMovieId === movie.id ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Movie Details */}
                  {expandedMovieId === movie.id && !editingMovie && (
                    <div className="px-4 pb-4 border-t border-gray-700 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-400">Description:</strong>
                          <p className="text-white mt-1 line-clamp-3">{movie.description}</p>
                        </div>
                        <div>
                          <strong className="text-gray-400">Video Info:</strong>
                          <p className="text-white mt-1">Source: {movie.videoSource}</p>
                          <p className="text-white">Video ID: {movie.videoId}</p>
                          <p className="text-white">Quality: {movie.quality}</p>
                        </div>
                        <div>
                          <strong className="text-gray-400">Details:</strong>
                          <p className="text-white mt-1">Rating: {movie.rating}</p>
                          <p className="text-white">Duration: {movie.duration}</p>
                          <p className="text-white">Views: {movie.viewCount}</p>
                        </div>
                        <div>
                          <strong className="text-gray-400">Cast & Crew:</strong>
                          <p className="text-white mt-1">Director: {movie.director}</p>
                          <p className="text-white">Cast: {Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}</p>
                        </div>
                        <div>
                          <strong className="text-gray-400">Technical:</strong>
                          <p className="text-white mt-1">Size: {movie.size}</p>
                          <p className="text-white">Language: {movie.language}</p>
                          <p className="text-white">Subtitles: {movie.subtitles}</p>
                        </div>
                        <div>
                          <strong className="text-gray-400">Metadata:</strong>
                          <p className="text-white mt-1">Uploaded: {new Date(movie.uploadDate).toLocaleDateString()}</p>
                          <p className="text-white">Country: {movie.country}</p>
                          <p className="text-white">Tags: {Array.isArray(movie.tags) ? movie.tags.join(', ') : movie.tags}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick Stats */}
        {!isLoading && movies.length > 0 && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Total Movies</p>
                <p className="text-white text-xl font-bold">{movies.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Categories</p>
                <p className="text-white text-xl font-bold">
                  {[...new Set(movies.map(m => m.category))].length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Genres</p>
                <p className="text-white text-xl font-bold">
                  {[...new Set(movies.flatMap(m => m.genre.split(',')))].length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Latest Added</p>
                <p className="text-white text-xl font-bold">
                  {movies.length > 0 ? new Date(movies[0].uploadDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MovieForm({ movie, onSave, onCancel }: { movie: Movie, onSave: (movie: Movie) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<Movie>(movie)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert string fields to arrays and ensure proper types
    const processedData: Movie = {
      ...formData,
      tags: typeof formData.tags === 'string' ? 
        formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : 
        formData.tags,
      cast: typeof formData.cast === 'string' ? 
        formData.cast.split(',').map(actor => actor.trim()).filter(actor => actor) : 
        formData.cast,
      viewCount: typeof formData.viewCount === 'string' ? 
        parseInt(formData.viewCount) || 0 : 
        formData.viewCount
    }
    
    onSave(processedData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4 text-white">
        {movie.id ? 'Edit Movie' : 'Add New Movie'}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Basic Information */}
        {!movie.id && (
          <input
            type="text"
            placeholder="ID (auto-generated if empty)"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            className="p-3 rounded bg-black text-white border border-gray-600"
          />
        )}
        <input
          type="text"
          placeholder="Video ID"
          value={formData.videoId}
          onChange={(e) => setFormData({...formData, videoId: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={formData.slug}
          onChange={(e) => setFormData({...formData, slug: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <select
          value={formData.videoSource}
          onChange={(e) => setFormData({...formData, videoSource: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        >
          <option value="shorticu">Shorticu</option>
          <option value="dailymotion">Dailymotion</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
          rows={3}
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
          required
        />

        {/* Movie Details */}
        <input
          type="datetime-local"
          value={formData.uploadDate.slice(0, 16)}
          onChange={(e) => setFormData({...formData, uploadDate: new Date(e.target.value).toISOString()})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="number"
          placeholder="View Count"
          value={formData.viewCount}
          onChange={(e) => setFormData({...formData, viewCount: parseInt(e.target.value) || 0})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Duration (PT1H09M3S)"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Language"
          value={formData.Language}
          onChange={(e) => setFormData({...formData, Language: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim())})}
          className="p-3 rounded bg-black text-white border border-gray-600 md:col-span-2"
        />
        <input
          type="text"
          placeholder="Director"
          value={formData.director}
          onChange={(e) => setFormData({...formData, director: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Cast (comma separated)"
          value={Array.isArray(formData.cast) ? formData.cast.join(', ') : formData.cast}
          onChange={(e) => setFormData({...formData, cast: e.target.value.split(',').map(actor => actor.trim())})}
          className="p-3 rounded bg-black text-white border border-gray-600"
        />
        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({...formData, genre: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Rating (6.5/10)"
          value={formData.rating}
          onChange={(e) => setFormData({...formData, rating: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={(e) => setFormData({...formData, releaseYear: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Quality (HD 1080p)"
          value={formData.quality}
          onChange={(e) => setFormData({...formData, quality: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Size (1.9 GB)"
          value={formData.size}
          onChange={(e) => setFormData({...formData, size: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Language (Country)"
          value={formData.language}
          onChange={(e) => setFormData({...formData, language: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Subtitles (N/A)"
          value={formData.subtitles}
          onChange={(e) => setFormData({...formData, subtitles: e.target.value})}
          className="p-3 rounded bg-black text-white border border-gray-600"
          required
        />
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 rounded hover:bg-gray-600 transition text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white"
        >
          <Save className="mr-2" size={20} />
          Save Movie
        </button>
      </div>
    </form>
  )
}