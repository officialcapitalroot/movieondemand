// pages/api/movies.js
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

export default function handler(req, res) {
  const { method } = req

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
    res.status(200).json({ success: true, movies })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}