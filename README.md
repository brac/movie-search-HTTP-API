# Movie Search HTTP API

## Description
A web server using Express that exposes a Movie Search HTTP API which fetches restuls by scraping `imdb.com`.

## Specs
- app uses Express to handle API requests
- http requests to IMDB are made using [request-promise](https://github.com/request/request-promise)
- use the [cheerio library](https://github.com/cheeriojs/cheerio) to extract contents from the HTML page.
- response header `content-type` is `application/json`
- any requests under the `/api/` namespace should render `JSON`

## Usage:
```
request: GET /api/imdb/search/:query
response: {"movies": [{name: "<movie-name>", year: "<year-released>"}]}
```

## Example:
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


