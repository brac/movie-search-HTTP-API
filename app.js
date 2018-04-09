// jshint asi:true

const express    = require('express')
const app        = express()
const rp         = require('request-promise')
const cheerio    = require('cheerio')

// Middlewear to set hearders for /api routes
app.use('/api', (req, res, next) => {
  res.setHeader("Content-Type", "application/json")
  next()
})

app.get('/api/movies/:query', (req, res, next) => {

  let options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${req.params.query}&s=all`,
    transform: (body) => { return cheerio.load(body) }
  }

  rp(options)
    .then(($) => {
      let movies = $('.findSection')
        .first()
        .find('.result_text')

        .map((i, elem) => {
          return {
            name: $(elem).text().split('-')[0].split(' (')[0].trim(),
            date: $(elem).text().split('-')[0].split(' (')[1].trim().slice(0, -1)}
        }).toArray()
      res.send({movies})
    })
    .catch( (err) => {
      next(err)
  })
})


app.use('/', (req, res) => {
  res.send('Welcome to the movie search API')
})


// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    console.log('Default Error Handler triggered')
    return next(err)
  }
  res.status(err.status || 500)
    .json({message: err.message, stack: err.stack})
})

app.listen(3000, (req, res) => {
  console.log('App listening on port 3000')
})
