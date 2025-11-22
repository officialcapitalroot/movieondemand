  // app/page.tsx
import Header from '../components/Header'
import MovieGrid from '../components/MovieGrid'
import HeroSection from '../components/HeroSection'
import moviesData from '../data/data.json'

export default function Home() {
  // Reverse the array to get latest entries first
  const reversedMovies = [...moviesData].reverse()
  
  // Get latest 5 movies for hero section (already reversed, so first 5 are latest)
  const heroMovies = reversedMovies.slice(0, 5)
  
  // Get remaining movies for grid (excluding the 5 used in hero)
  const gridMovies = reversedMovies.slice(5)

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroSection movies={heroMovies} />
      
      {/* Movie Grids - All showing latest first */}
      <div className="bg-black py-8">
        <MovieGrid movies={gridMovies} title="Latest Movies" />
        <MovieGrid movies={reversedMovies} title="All Movies " />
        <MovieGrid 
          movies={reversedMovies.filter(m => m.category === 'Adult')} 
          title="Adult Movies" 
        />
        <MovieGrid 
          movies={reversedMovies.filter(m => m.genre.includes('Drama'))} 
          title="Drama Movies" 
        />
        <MovieGrid 
          movies={reversedMovies.filter(m => m.genre.includes('Action'))} 
          title="Action Movies" 
        />
      </div>
    </main>
  )
}