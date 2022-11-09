const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

//API calls
async function getTrendingMoviesPreview() {
    const pathURL = '/trending/movie/day'
    renderMovies(trendingMoviesPreviewList, pathURL)
}

async function getTrendingMovies() {
    const pathURL = '/trending/movie/day'
    renderMovies(genericSection, pathURL)
}

async function getMovieByCategory(id) {
    const pathURL = '/discover/movie'
    const config = {params: {with_genres: id,},}    
    
    renderMovies(genericSection, pathURL, config)
    
}

async function getMoviesBySearch(query) {
    const pathURL = '/search/movie'
    const config = {
        params: {
            query: query
        },}    
    
    renderMovies(genericSection, pathURL, config)
    
}

async function getMovieByID(id) {
    const { data: movie } = await api(`/movie/${id}`);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    console.log(movieImgUrl);
    
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movieImgUrl}
        )`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overall;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesID(id)
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');    
    const categories = data.genres;
    
    createCategories(categories, categoriesPreviewList);
}

async function getRelatedMoviesID(id) {    
    pathURL = (`movie/${id}/recommendations`);   

    renderMovies(relatedMoviesContainer, pathURL);
}

//utils
async function renderMovies(elementHTML, path, optionalConfig = {}) {
    const { data } = await api(path, optionalConfig);   
    const movies = data.results;
    
    elementHTML.innerHTML = ""

    movies.forEach(movie => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);        
        movieImg.setAttribute(
            'src', 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            );
        movieContainer.appendChild(movieImg);        
        elementHTML.appendChild(movieContainer);
    }); 
}

async function createCategories(categories, elementHTML) {
    elementHTML.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    elementHTML.appendChild(categoryContainer);
  });
}
