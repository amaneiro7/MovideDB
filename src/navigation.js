window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

arrowBtn.addEventListener('click', () => location.hash = 'home=');
trendingBtn.addEventListener('click', () => location.hash = 'trends=');
searchFormBtn.addEventListener('click', () => location.hash = 'search=');

function navigator() {  
    

    location.hash.startsWith('#trends')     ?
        trendsPage()        :
    location.hash.startsWith('#category=')  ?
        categoriesPage()    :
    location.hash.startsWith('#movie=')     ?
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
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}