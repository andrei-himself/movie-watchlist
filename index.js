// OMDB API key: e42f5faf
const omdbApiKey = 'e42f5faf'
const searchInput = document.getElementById("search-input")
const movieSection = document.getElementById("movies")
const keys = Object.keys(localStorage)
const moviesInWatchlist = keys.map(key => JSON.parse(localStorage.getItem(key)))
// localStorage.clear()

document.addEventListener('click', e => {
    if (e.target.dataset.button === "search-btn") {
        searchMovies(searchInput.value)
    } else if (e.target.dataset.addToWatchlist) {
        addToDatabase(e.target.dataset.addToWatchlist)
    }
})

async function searchMovies(searchKeyword) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchKeyword}`)
    const data = await response.json()
    getMovieDetails(data.Search)
}

async function getMovieDetails(movies) {
    resultsArray = await Promise.all( movies.map( async(movie)=> {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdbID}`)
        return await response.json()
    }))
    renderMovies(resultsArray)
}

function renderMovies(movies) {
    moviesHtml = ''
    movies.forEach(movie => {
        moviesHtml += `
            <div class="movie">
                <img src="${movie.Poster}" class="movie-poster">
                <div class="movie-text">
                    <div class="title">
                        <h2>${movie.Title}</h2>
                        <p class="rating"><img src="images/star.png">${movie.imdbRating}</p>
                    </div>
                    <div class="details">
                        <span>${movie.Runtime}</span>
                        <span>${movie.Genre}</span>
                        <button data-add-to-watchlist="${movie.imdbID}"><img src="images/plus_icon.png">Watchlist</button>
                    </div>
                    <p class="description">
                        ${movie.Plot}
                    </p>
                </div>
            </div>
        `
    });
    movieSection.innerHTML = moviesHtml
}

function addToDatabase(movieId) {

    for (let i = 0; i < resultsArray.length; ++i) {
        if (resultsArray[i].imdbID === movieId) {
            localStorage.setItem(movieId, JSON.stringify(resultsArray[i]))
            break
        }
    }
}