// // app/api/movies/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import fs from 'fs/promises'
// import path from 'path'

// const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

// export async function GET() {
//   try {
//     const data = await fs.readFile(dataFilePath, 'utf8')
//     return NextResponse.json(JSON.parse(data))
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to load movies' }, { status: 500 })
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const newMovie = await request.json()
//     const data = await fs.readFile(dataFilePath, 'utf8')
//     const movies = JSON.parse(data)
    
//     // Generate new ID
//     const newId = (movies.length + 1).toString().padStart(2, '0')
//     newMovie.id = newId
//     newMovie.uploadDate = new Date().toISOString()
    
//     movies.push(newMovie)
//     await fs.writeFile(dataFilePath, JSON.stringify(movies, null, 2))
    
//     return NextResponse.json(newMovie)
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to add movie' }, { status: 500 })
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { id } = await request.json()
//     const data = await fs.readFile(dataFilePath, 'utf8')
//     let movies = JSON.parse(data)
    
//     movies = movies.filter((movie: any) => movie.id !== id)
//     await fs.writeFile(dataFilePath, JSON.stringify(movies, null, 2))
    
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 })
//   }
// }






// app/api/movies/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

// Helper function to read movies from file
function readMovies(): any[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Create directory if it doesn't exist
      const dir = path.dirname(dataFilePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      // Create empty array if file doesn't exist
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2))
      return []
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading movies file:', error)
    return []
  }
}

// Helper function to write movies to file
function writeMovies(movies: any[]): boolean {
  try {
    const dir = path.dirname(dataFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
    return true
  } catch (error) {
    console.error('Error writing movies file:', error)
    return false
  }
}

export async function GET() {
  try {
    const movies = readMovies()
    return NextResponse.json({ success: true, movies })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to read movies data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const movieData = await request.json()
    const movies = readMovies()
    
    // Generate ID if not provided
    if (!movieData.id) {
      const maxId = movies.length > 0 ? Math.max(...movies.map((m: any) => parseInt(m.id) || 0)) : 0
      movieData.id = (maxId + 1).toString()
    }
    
    // Add new movie
    movies.push(movieData)
    
    if (writeMovies(movies)) {
      return NextResponse.json({ success: true, movies })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save movies data'
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create movie',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const movieData = await request.json()
    const movies = readMovies()
    
    // Update existing movie
    const index = movies.findIndex((m: any) => m.id === movieData.id)
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Movie not found'
      }, { status: 404 })
    }
    
    movies[index] = movieData
    
    if (writeMovies(movies)) {
      return NextResponse.json({ success: true, movies })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to update movies data'
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update movie',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const movies = readMovies()
    
    // Filter out the movie to delete
    const filteredMovies = movies.filter((m: any) => m.id !== id)
    
    if (filteredMovies.length === movies.length) {
      return NextResponse.json({ 
        success: false, 
        error: 'Movie not found'
      }, { status: 404 })
    }
    
    if (writeMovies(filteredMovies)) {
      return NextResponse.json({ success: true, movies: filteredMovies })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to delete movie from data'
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete movie',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}