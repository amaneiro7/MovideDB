const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

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

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');    
    const categories = data.genres;

    categoriesPreviewList.innerHTML = "";
    
    
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        });
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);
    });   
}

async function renderMovies(elementHTML, path, optionalConfig = {}) {
    const { data } = await api(path, optionalConfig);   
    const movies = data.results;
    
    elementHTML.innerHTML = ""

    movies.forEach(movie => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

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


