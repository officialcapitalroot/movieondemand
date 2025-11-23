// pages/categories.js
import MovieGrid from '../components/MovieGrid'
import moviesData from '../data/data.json'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'


export default function CategoriesPage() {
  // Reverse the array to get latest entries first
  const reversedMovies = [...moviesData].reverse()
  
  const categories = Array.from(new Set(reversedMovies.map(movie => movie.category)))
  const genres = Array.from(new Set(reversedMovies.flatMap(movie => movie.genre.split(', '))))

  return (
    <>
      <Head>
        <title>Movie Categories - Movie On Demand</title>
        <meta name="description" content="Browse movies by categories including Action, Comedy, Drama, Romance and more." />
      </Head>
      <Header />
      <main className="min-h-screen bg-black pt-20 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Browse Categories</h1>
          
          {/* Categories Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <CategoryCard 
                  key={index} 
                  category={category} 
                  movieCount={reversedMovies.filter(m => m.category === category).length}
                />
              ))}
            </div>
          </section>

          {/* Genres Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre, index) => (
                <GenreTag key={index} genre={genre} />
              ))}
            </div>
          </section>

          {/* Movies by Category - All showing latest first */}
          {categories.map((category) => (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{category} Movies</h2>
              <MovieGrid 
                movies={reversedMovies.filter(movie => movie.category === category)} 
                title=""
              />
            </section>
          ))}
        </div>
        <Footer />
      </main>
    </>
  )
}

function CategoryCard({ category, movieCount }) {
  return (
    <div className="category-card bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="category-card-image mb-3">
        <h3 className="category-card-title text-white text-lg font-semibold">{category}</h3>
      </div>
      <div className="category-card-count text-gray-400 text-sm">
        {movieCount} {movieCount === 1 ? 'movie' : 'movies'}
      </div>
    </div>
  )
}

function GenreTag({ genre }) {
  return (
    <span className="genre-tag bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors duration-300 cursor-pointer">
      {genre}
    </span>
  )
}