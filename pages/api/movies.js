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

// Simple in-memory rate limiting (no external dependency)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  const requests = requestCounts.get(ip);
  // Remove old requests outside the current window
  while (requests.length > 0 && requests[0] <= windowStart) {
    requests.shift();
  }
  
  // Check if under rate limit
  if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  requests.push(now);
  return true;
}

export default function handler(req, res) {
  const { method } = req
  
  // Get client IP
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  
  // Check rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ 
      success: false, 
      error: 'Too many requests, please try again later.' 
    });
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