window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

arrowBtn.addEventListener('click', () => location.hash = history.back());
trendingBtn.addEventListener('click', () => location.hash = 'trends=');
searchFormBtn.addEventListener('click', () => location.hash = `search=${searchFormInput.value.toLowerCase()}`);

function navigator() {  
    window.scrollTo(0,0);
    

    location.hash.startsWith('#trends')     ?
        trendsPage()        :
    location.hash.startsWith('#category')  ?
        categoriesPage()    :
    location.hash.startsWith('#movie')     ?
        movieDetailsPage()  :
    location.hash.startsWith('#search=')    ?
        searchPage()        :
        homePage()          
}

function homePage() {
    console.log('Home!!!!');

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
    console.log('TRENDS!!!!');
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
}

function categoriesPage() {
    console.log('Categories!!!!');

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
}

function movieDetailsPage() {
    console.log('Movie!!!!');
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

}

function searchPage() {
    console.log('Search!!!!');

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
    console.log(query);
    getMoviesBySearch(query)
}