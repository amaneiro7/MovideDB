window.addEventListener('load', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage()
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    }  else if (location.hash.startsWith('#search=')) {
        searchPage()
    }  else {
        homePage()
    }       
}

function trendsPage() {
    console.log('TRENDS!!!!');
}
function categoriesPage() {
    console.log('Categories!!!!');
}
function movieDetailsPage() {
    console.log('Movie!!!!');
}
function searchPage() {
    console.log('Search!!!!');
}
function homePage() {
    console.log('Home!!!!');
}