// app/categories/page.tsx
import Header from '../../components/Header'
import MovieGrid from '../../components/MovieGrid'
import moviesData from '../../data/data.json'

export const metadata = {
  title: 'Movie Categories - Movie On Demand ',
  description: 'Browse movies by categories including Action, Comedy, Drama, Romance and more.',
}

export default function CategoriesPage() {
  // Reverse the array to get latest entries first
  const reversedMovies = [...moviesData].reverse()
  
  // const categories = [...new Set(reversedMovies.map(movie => movie.category))]
  // const genres = [...new Set(reversedMovies.flatMap(movie => movie.genre.split(', ')))]

  const categories = Array.from(new Set(reversedMovies.map(movie => movie.category)))
  const genres = Array.from(new Set(reversedMovies.flatMap(movie => movie.genre.split(', '))))

  return (
    <>
      <Header />
      <main className="categories-container">
        <div className="container">
          <h1 className="hero-title mb-8">Browse Categories</h1>
          
          {/* Categories Section */}
          <section className="mb-12">
            <h2 className="section-title">All Categories</h2>
            <div className="categories-grid">
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
            <h2 className="section-title">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre, index) => (
                <GenreTag key={index} genre={genre} />
              ))}
            </div>
          </section>

          {/* Movies by Category - All showing latest first */}
          {categories.map((category) => (
            <section key={category} className="mb-12">
              <h2 className="section-title">{category} Movies </h2>
              <MovieGrid 
                movies={reversedMovies.filter(movie => movie.category === category)} 
                title=""
              />
            </section>
          ))}
        </div>
      </main>
    </>
  )
}

function CategoryCard({ category, movieCount }: { category: string; movieCount: number }) {
  return (
    <div className="category-card hover-lift">
      <div className="category-card-image">
        <h3 className="category-card-title">{category}</h3>
      </div>
      <div className="category-card-count">
        {movieCount} {movieCount === 1 ? 'movie' : 'movies'}
      </div>
    </div>
  )
}

function GenreTag({ genre }: { genre: string }) {
  return (
    <span className="genre-tag hover-glow">
      {genre}
    </span>
  )
}