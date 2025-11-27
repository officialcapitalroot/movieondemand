// // // pages/api/movies.js
// // import fs from 'fs'
// // import path from 'path'

// // const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

// // export default function handler(req, res) {
// //   const { method } = req

// //   switch (method) {
// //     case 'GET':
// //       return getMovies(req, res)
// //     case 'POST':
// //       return createMovie(req, res)
// //     case 'PUT':
// //       return updateMovie(req, res)
// //     case 'DELETE':
// //       return deleteMovie(req, res)
// //     default:
// //       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
// //       res.status(405).end(`Method ${method} Not Allowed`)
// //   }
// // }

// // function getMovies(req, res) {
// //   try {
// //     const data = fs.readFileSync(dataFilePath, 'utf8')
// //     const movies = JSON.parse(data)
// //     res.status(200).json({ success: true, movies })
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message })
// //   }
// // }

// // function createMovie(req, res) {
// //   try {
// //     const data = fs.readFileSync(dataFilePath, 'utf8')
// //     const movies = JSON.parse(data)
// //     const newMovie = {
// //       ...req.body,
// //       id: req.body.id || Date.now().toString(),
// //       uploadDate: new Date().toISOString()
// //     }
    
// //     movies.push(newMovie)
// //     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
// //     res.status(200).json({ success: true, movies })
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message })
// //   }
// // }

// // function updateMovie(req, res) {
// //   try {
// //     const data = fs.readFileSync(dataFilePath, 'utf8')
// //     let movies = JSON.parse(data)
// //     const updatedMovie = req.body
    
// //     movies = movies.map(movie => 
// //       movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
// //     )
    
// //     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
// //     res.status(200).json({ success: true, movies })
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message })
// //   }
// // }

// // function deleteMovie(req, res) {
// //   try {
// //     const data = fs.readFileSync(dataFilePath, 'utf8')
// //     let movies = JSON.parse(data)
// //     const { id } = req.body
    
// //     movies = movies.filter(movie => movie.id !== id)
// //     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
// //     res.status(200).json({ success: true, movies })
// //   } catch (error) {
// //     res.status(500).json({ success: false, error: error.message })
// //   }
// // }

















// // pages/api/movies.js
// import fs from 'fs'
// import path from 'path'

// const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

// export default function handler(req, res) {
//   const { method } = req

//   switch (method) {
//     case 'GET':
//       return getMovies(req, res)
//     case 'POST':
//       return createMovie(req, res)
//     case 'PUT':
//       return updateMovie(req, res)
//     case 'DELETE':
//       return deleteMovie(req, res)
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }

// function getMovies(req, res) {
//   try {
//     const data = fs.readFileSync(dataFilePath, 'utf8')
//     const movies = JSON.parse(data)
//     res.status(200).json({ success: true, movies })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// }

// function createMovie(req, res) {
//   try {
//     const data = fs.readFileSync(dataFilePath, 'utf8')
//     const movies = JSON.parse(data)
//     const newMovie = {
//       ...req.body,
//       id: req.body.id || Date.now().toString(),
//       uploadDate: new Date().toISOString()
//     }
    
//     movies.push(newMovie)
//     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
//     res.status(200).json({ success: true, movies })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// }

// function updateMovie(req, res) {
//   try {
//     const data = fs.readFileSync(dataFilePath, 'utf8')
//     let movies = JSON.parse(data)
//     const updatedMovie = req.body
    
//     movies = movies.map(movie => 
//       movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
//     )
    
//     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
//     res.status(200).json({ success: true, movies })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// }

// function deleteMovie(req, res) {
//   try {
//     const data = fs.readFileSync(dataFilePath, 'utf8')
//     let movies = JSON.parse(data)
//     const { id } = req.body
    
//     movies = movies.filter(movie => movie.id !== id)
//     fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
//     res.status(200).json({ success: true, movies })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// }














// pages/api/movies.js
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

// Simple rate limiting example
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export default function handler(req, res) {
  const { method } = req

  // Apply rate limiting to all methods
  limiter(req, res, (err) => {
    if (err) {
      return res.status(429).json({ 
        success: false, 
        error: 'Too many requests, please try again later.' 
      })
    }

    switch (method) {
      case 'GET':
        return getMovies(req, res)
      case 'POST':
        return createMovie(req, res)
      case 'PUT':
        return updateMovie(req, res)
      case 'DELETE':
        return deleteMovie(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  })
}

function getMovies(req, res) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    const movies = JSON.parse(data)
    
    // Set caching headers for GET requests
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('CDN-Cache-Control', 'max-age=3600')
    res.setHeader('Vary', 'Accept-Encoding')
    
    res.status(200).json({ success: true, movies })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

function createMovie(req, res) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    const movies = JSON.parse(data)
    const newMovie = {
      ...req.body,
      id: req.body.id || Date.now().toString(),
      uploadDate: new Date().toISOString()
    }
    
    movies.push(newMovie)
    fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
    
    // No caching for POST requests
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    
    res.status(200).json({ success: true, movies })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

function updateMovie(req, res) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let movies = JSON.parse(data)
    const updatedMovie = req.body
    
    movies = movies.map(movie => 
      movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
    )
    
    fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
    
    // No caching for PUT requests
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    
    res.status(200).json({ success: true, movies })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

function deleteMovie(req, res) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let movies = JSON.parse(data)
    const { id } = req.body
    
    movies = movies.filter(movie => movie.id !== id)
    fs.writeFileSync(dataFilePath, JSON.stringify(movies, null, 2))
    
    // No caching for DELETE requests
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    
    res.status(200).json({ success: true, movies })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}