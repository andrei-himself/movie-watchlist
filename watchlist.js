const movieSection = document.getElementById("movies")
const noMovies = document.getElementsByClassName("no-movies")
const keys = Object.keys(localStorage)
const moviesInWatchlist = keys.map(key => JSON.parse(localStorage.getItem(key)))

if (moviesInWatchlist[0]) {
    noMovies[0].classList.add("display-none")
    renderMovies(moviesInWatchlist)
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
                        <button data-remove-from-watchlist="${movie.imdbID}"><img src="images/minus_icon.png">Watchlist</button>
                    </div>
                    <p class="description">
                        ${movie.Plot}
                    </p>
                </div>
            </div>
        `
    });
    movieSection.innerHTML = moviesHtml
    movieSection.classList.remove("display-none")
}

document.addEventListener('click', e => {

    if (e.target.dataset.removeFromWatchlist) {
        removeFromDatabase(e.target.dataset.removeFromWatchlist)
    }
})

function removeFromDatabase(movieId) {

    localStorage.removeItem(movieId)
    const keys = Object.keys(localStorage)
    const moviesInWatchlist = keys.map(key => JSON.parse(localStorage.getItem(key)))
    if (moviesInWatchlist[0]) {
        renderMovies(moviesInWatchlist)
    } else {
        movieSection.innerHTML = ''
        movieSection.classList.remove("display-none")
        noMovies[0].classList.remove("display-none")
    }
}