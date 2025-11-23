import Head from 'next/head'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import MovieGrid from '../components/MovieGrid'
import Footer from '../components/Footer'
import moviesData from '../data/data.json'

export default function Home({ movies }) {
  const heroMovies = movies.slice(0, 5)
  const gridMovies = movies.slice(5)

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Movie On Demand - Request Any Movie via Telegram</title>
        <meta name="description" content="Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language. We add requested movies within 24 hours." />
        <meta property="og:title" content="Movie On Demand - Request Any Movie via Telegram" />
        <meta property="og:description" content="Movie On Demand Service - Request any movie via Telegram by sending movie name, year, and language." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://movieondemand.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />
      <HeroSection movies={heroMovies} />
      
      <div className="bg-black py-8">
        
        <MovieGrid movies={gridMovies} title="Latest Movies" />
        <MovieGrid movies={movies} title="All Movies" />
        <MovieGrid 
          movies={movies.filter(m => m.category === 'Adult')} 
          title="Adult Movies" 
        />
      </div>
      
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  // Reverse to show latest first
  const reversedMovies = [...moviesData].reverse()
  
  return {
    props: {
      movies: reversedMovies,
    },
    revalidate: 3600, // Revalidate every hour
  }
}