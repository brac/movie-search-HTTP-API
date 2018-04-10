# Review

## Goal:
To wrtie a web server using Express that exposes a Movie Search HTTP API which fetches restuls by scraping `imdb.com`.

### The Plan
* Install
  * Express
  * cheerio
  * body-parser - didn't need this
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
 - FrontEnd
 - ejs
 - Heroku deployment

I enjoyed this benchmark.

I started by installing express, cheerio, body-parser (which I didnt need) and ```request-promise```. Looking at the docs for ```request-promise``` I had to install ```request``` first because the latter is a peer module, or vice versa or some such.

First up was something that I could start building on, so that's ```app.js```.

There I required express and our movie routes. I wanted any request to ```/api``` to have a response with headers that were ```application/json```. There's a few ways I could have done this but I decided that I wanted to use middlewear to set the headers for every request. I noticed that I had to put this before registering my movie route to get it to work.

After registering those routes I included a catch all that would send a welcome message in text/html.

I set up a simple error handler that would fire the default error handler if the headers were already sent to the client, or pass the error and it's status on to a ```.json()``` response.

Lastly we started the server.

Moving backwards it seems sometimes, I next wrote the ```api/movie``` routes, which was just two.

The first was a route if the user did not provide a query term. I wanted to try this to see if I could set the status to something besides the usual, which was pretty easy.

Next up is our actual quesy route. I originally wrote it all together and later refacotred scraping part to another file. So that means that I'll have a function that I'll import which I decided would return a promise. Ok so fire that function, it will return a promise so ```.then()```...

I checked the results. If the result were empty then I set the status to 404 and ```return next(error)```.

If the results were good then I ```return res.send({movies: results})```. If there was an error during that scraping process and the promise was rejected, I caught the rejection with ```error => next(error```.

Ok so now to the meat of this application, that ```movieSearch()``` function which I'm calling in my ```api/movie``` route above.

I required ```request-promise``` to do the talking to imdb, and ```cheerio``` to query the results eaisly in a jQuery manner.

Ok so ```movieSearch``` takes a single param, ```query``` and returns a new Promise.

Following the docs I set up some options for the ```rp``` operation, namely the uri and what to do with that data. In this case we are taking the returned data and loading into cheerio, which we will get back as a global(?) variable ```$```

I won't get into the deatils, but once I got the data back I preformed a number of string parsing operations to get the name and date of the results. I turned that into an array and ```resolve()``` the data, which sends it back to the routes, which will display the results. Neat!
























