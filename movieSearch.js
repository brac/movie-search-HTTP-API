// jshint asi:true

const rp      = require('request-promise')
const cheerio = require('cheerio')

const movieSearch = (query) => {
  return new Promise((resolve, reject) => {
    let options = {
      uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${query}&s=all`,
      transform: body => cheerio.load(body)
    }

    rp(options).then(
      $ => {
        let movies = $('.findSection')
          .first()
          .find('.result_text')
          .map((i, elem) => {
            return {
              name: $(elem).text().split('-')[0].split(' (')[0].trim(),
              date: $(elem).text().split('-')[0].split(' (')[1].trim().slice(0, -1)
            }
          }).toArray()
        resolve(movies)
      })
      .catch(err => reject(err))
  })
}

module.exports = movieSearch