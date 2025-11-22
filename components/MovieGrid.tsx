// components/MovieGrid.tsx
import MovieCard from './MovieCard'

export default function MovieGrid({ movies, title }: { movies: any[], title: string }) {
  if (!movies.length) return null
  
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}