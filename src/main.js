//Data
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'ES-es',
    },
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    const likedMovies = likedMoviesList();

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies))
    getTrendingMoviesPreview()
    getLikedMovies(true, true)
}


//API calls
async function getTrendingMoviesPreview() {
    const pathURL = '/trending/movie/day'
    renderMovies(trendingMoviesPreviewList, pathURL, true)
}

async function getTrendingMovies() {
    const pathURL = '/trending/movie/day'
    renderMovies(genericSection, pathURL);  
    
}

async function getPaginatedTrendingMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    const scrollIsBottom =  (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const pathURL = '/trending/movie/day'
        const config = {
            params: {
                page,
            },
        }    
        
        renderMovies(genericSection, pathURL, { lazyLoad: true, clean: false }, config)        
    }

}

async function getMovieByCategory(id) {
    const pathURL = '/discover/movie'
    const config = {
        params: {
            
        },
    }    
    
    renderMovies(genericSection, pathURL, {lazyLoad: true, clean: true} , config)    
}

function getPaginatedMoviesByCategory(id) {
    return async () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
    
        const scrollIsBottom =  (scrollTop + clientHeight) >= (scrollHeight - 15);
        const pageIsNotMax = page < maxPage;        
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const pathURL = '/discover/movie'
            const config = {
                params: {
                    with_genres: id,
                    page,
                },
            }    
            
            renderMovies(genericSection, pathURL, { lazyLoad: true, clean: false }, config)        
        }    
    }
}

async function getMoviesBySearch(query) {
    const pathURL = '/search/movie'
    const config = {
        params: {
            query: query
        },}    
    
    renderMovies(genericSection, pathURL, {lazyLoad: true, clean: true}, config)    
}

function getPaginatedMoviesBySearch(query) {
    return async () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
    
        const scrollIsBottom =  (scrollTop + clientHeight) >= (scrollHeight - 15);
        const pageIsNotMax = page < maxPage;        
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const pathURL = '/search/movie'
            const config = {
                params: {
                    query,
                    page,
                },
            }    
            
            renderMovies(genericSection, pathURL, { lazyLoad: true, clean: false }, config)        
        }    
    }
}

async function getMovieByID(id) {
    const { data: movie } = await api(`/movie/${id}`);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;    
    
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
    url(${movieImgUrl}
        )`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

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

function getLikedMovies({ lazyLoad = true, clean = true, } = {}) {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);
    
    if (clean) {
        likedMoviesListArticle.innerHTML = ""
    }  
    
    moviesArray.forEach(movie => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');        

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            );
        movieImg.addEventListener('click', () => {
                location.hash = `movie=${movie.id}`
            })
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png')
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn')        
        movieBtn.classList.add('movie-btn--liked')
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked')
            likeMovie(movie);
        })
            
        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);    
        movieContainer.appendChild(movieBtn);
        likedMoviesListArticle.appendChild(movieContainer);        
    });     
}

//utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
        }
    });
});

async function renderMovies(elementHTML, path, { lazyLoad = false, clean = true, } = {}, optionalConfig = {}) {
    const { data } = await api(path, optionalConfig);   
    const movies = data.results;
    maxPage = data.total_pages;    

    if (clean) {
        elementHTML.innerHTML = ""
    }    
    
    movies.forEach(movie => {        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');        

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title); 
        // movieImg.setAttribute("loading","lazy");       
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            );
        movieImg.addEventListener('click', () => {
                location.hash = `movie=${movie.id}`
            })
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png')
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn')
        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked')
            likeMovie(movie);
        })
            
        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);    
        movieContainer.appendChild(movieBtn)    
        elementHTML.appendChild(movieContainer);        
    }); 
};

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
