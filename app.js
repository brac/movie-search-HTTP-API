// jshint asi:true

const express    = require('express')
const app        = express()
const movies     = require('./routes/movies')

// Middlewear to set hearders for /api routes
app.use('/api', (req, res, next) => {
  res.setHeader("Content-Type", "application/json")
  next()
})

app.use('/api/movies', movies)

app.use('*', (req, res) => {
  res.send('Welcome to the movie search API')
})

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.log('Default Error Handler triggered')
    return next(err)
  }
  res.status(err.status || 500)
    .json({errors: [err.message, err.status]})
})

app.listen(3000, (req, res) => {
  console.log('App listening on port 3000')
})
