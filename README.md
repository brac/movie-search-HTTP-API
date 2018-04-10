# Movie Search HTTP API

## Description
A web server using Express that exposes a Movie Search HTTP API which fetches restuls by scraping `imdb.com`.

## Specs
- app uses Express to handle API requests
- http requests to IMDB are made using [request-promise](https://github.com/request/request-promise)
- use the [cheerio library](https://github.com/cheeriojs/cheerio) to extract contents from the HTML page.
- response header `content-type` is `application/json`
- any requests under the `/api/` namespace should render `JSON`

## Required Routes:
```
request: GET /api/imdb/search/:query
response: {"movies": [{name: "<movie-name>", year: "<year-released>"}]}
```

## Example Request
Doing a `GET` to `/api/search/findingnemo` should render something like:

```json
{
  "movies":[
    {"name": "Finding Nemo", "year": "2003"},
    {"name": "Finding Nemo", "year": "2003"},
    {"name": "Finding Nemo", "year": "2001"},
    {"name": "Finding Dory", "year": "2016"},
    {"name": "Finding Nemo Submarine Voyage", "year": "2007"},
    {"name": "Finding Nemo: Studio Tour of Pixar ", "year": "2003"},
    {"name": "Finding Nemo Attraction & Stage Show", "year": "2007"}
  ]
}
```

## Hint
- Sample IMDB search url : `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`. Replace `findingnemo` with the dynamic search term.


### The Plan
* Install
  * Express
  * cheerio
  * body-parser
  * request-promise
* Build
  * server
    * app.js
      * configuration
        * content-type : application/json
          * Set either as individual get responses with res.json()
        * body-parser.json, urlextended : true
      * default route
      * api register routes
      * error handlers
        * status codes
  * api routes
    * GET /api/movies/:query
    * ```response: {"movies": [{name: "<movie-name>", year: "<year-released>"}]}```
    *   Not Found response
* Refactor
  * Sepearte Routes
  * Request
  * String Parsing / Object formatting

- Stretch Goals
 - ejs
 - Heroku deployment






































