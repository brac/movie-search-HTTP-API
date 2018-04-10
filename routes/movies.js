// jshint asi:true

const express = require('express')
const router = express.Router()
const movieSearch = require('../movieSearch')

router.get('/', (req, res) => {
  res.status(400).send({message: 'Please provide a movie name in the URI'})
})

router.get('/:query', (req, res, next) => {
  movieSearch(req.params.query).then(
    results => {

      if (results.length === 0) {
        const error = new Error('No match found')
        error.status = 404
        return next(error)
      }
      return res.send({movies: results}
    )},
    error => next(error)
  )
})

module.exports = router

