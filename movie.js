const searchContainer = document.querySelector('#search-container')

const movieContainer = document.querySelector('#movie-container')

let resultsDiv = document.querySelector('#results')

let searchBaseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=123473bdd149f676250ff128b6662030&query='

let searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchBar = document.querySelector('#search-bar')
    let searchUrl = `${searchBaseUrl}${searchBar.value}`
    getSearchResults(searchUrl)
})
function getSearchResults(url){
    fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    .then(function (response){
        return response.json()
    })

    .then(function (data){
        let movies = data.results;
            clearContainer(movieContainer);
        console.log(movies)
        for (let movie of movies){
            let movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            let moviePosterDiv = document.createElement('img');
            moviePosterDiv.classList.add('poster');
            moviePosterDiv.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            let movieTitleDiv = document.createElement('div');
            movieTitleDiv.classList.add('title');
            movieTitleDiv.innerText = `${movie.original_title}`;
            let movieDescriptionDiv = document.createElement('div');
            movieDescriptionDiv.classList.add('description');
            movieDescriptionDiv.innerText = `${movie.overview}`;

            movieDiv.appendChild(moviePosterDiv);
            movieDiv.appendChild(movieTitleDiv);
            movieDiv.appendChild(movieDescriptionDiv);
            movieContainer.appendChild(movieDiv);

        }
    })
}

function clearContainer(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}