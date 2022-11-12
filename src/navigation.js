let page = 1;
let infiniteScroll;
let maxPage;

window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, {passive: false});

arrowBtn.addEventListener('click', () => {
    if (document.referrer.split('/')[2] === window.location.host) {    
        location.hash = history.go(-1)        
    } else {
        console.log(window.location.host);
        window.location.assign('')        
        homePage();        
    }
});

trendingBtn.addEventListener('click', () => {
    location.hash = 'trends'
});
searchFormBtn.addEventListener('click', () => {
    location.hash = `search=${searchFormInput.value.toLowerCase()}`
});

function navigator() {  
    window.scrollTo(0,0);

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, false);
        infiniteScroll = undefined;
    }
    
    location.hash.startsWith('#trends')     ?
        trendsPage()        :
    location.hash.startsWith('#category')  ?
        categoriesPage()    :
    location.hash.startsWith('#movie')     ?
        movieDetailsPage()  :
    location.hash.startsWith('#search=')    ?
        searchPage()        :
        homePage();
    
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, false);

    }

}

function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background= '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Tendencias'
    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}

function categoriesPage() {
    
    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMovieByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    headerSection.classList.add('header-container--long')
    // headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    const [_, movieId] = location.hash.split('=')
    getMovieByID(movieId)
}

function searchPage() {    

    headerSection.classList.remove('header-container--long')
    headerSection.style.background= '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=')
    
    getMoviesBySearch(query)
    infiniteScroll = getPaginatedMoviesBySearch(query);
}