const URL_tmdbPosterBase = "https://image.tmdb.org/t/p/w500/";
const URL_pageGoogle = "https://play.google.com/store/movies/details?id=";
const URL_pageIMDB = "https://imdb.com/title/";
const URL_pageTMDB = "https://themoviedb.org/movie/";
const URL_searchGoogle = "https://play.google.com/store/search?c=movies&q=";
const URL_searchFandango = "https://www.fandangonow.com/#search=";
const URL_searchIMDB = "https://www.imdb.com/find?q=";
const URL_dbJSON = `${process.env.PUBLIC_URL}/mvdb.json`

export {
    URL_dbJSON,
    URL_pageIMDB,
    URL_searchIMDB,
    URL_pageTMDB,
    URL_searchFandango,
    URL_searchGoogle,
    URL_tmdbPosterBase,
    URL_pageGoogle,
}