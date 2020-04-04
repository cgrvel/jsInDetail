// how module works on ES6
/* export const sum = (a,b) => a+b;
export const mul =(a,b) => a*b; */

import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

const renderRecipe = recipe => {
   const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
            `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};

export const limitRecipeTitle = (title, limit = 17 ) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
        // let shortened = title.split(" ").reduce((acc,curr)=> (acc+curr).length <= limit ? `${acc}${curr} `:acc,"");
        // return `${shortened}...`;
    }
    return title;
}

const createButton = (pageNumber, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? pageNumber-1 : pageNumber+1}>
        <span>Page ${type === 'prev' ? pageNumber-1 : pageNumber+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        </button>
        `;

const renderButtons = (page, totalRecipes, pageLimit) => {
    const pages = Math.ceil(totalRecipes / pageLimit);
    let button;
    if(page === 1 && pages > 1) {
        // to next page
        button = createButton(page, 'next');
    } 
    else if (page < pages ) {
        // both page buttons
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
    }
    else if(page === pages && pages > 1) {
        // to previos page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

export const renderResult = (recipes, page = 2, pageLimit = 10) => {
    const start = (page - 1) * pageLimit;
    const end = page * pageLimit;
   recipes.slice(start,end).forEach(renderRecipe);
   renderButtons(page, recipes.length, pageLimit);
};
