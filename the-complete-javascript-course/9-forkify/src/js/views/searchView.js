
import { dome, domStrs, getDOM } from './base'

export const getInput = () => dome.searchInput.value;

export const clearInput = () => { dome.searchInput.value = '' };

export const clearResults = () => {
    // Clear results
    dome.searchResList.innerHTML = '';
    // Clear pagination buttons
    dome.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll(domStrs.recipeItem));

    resultsArr.forEach(el => {
        el.classList.remove(domStrs.selectedRecipe);
    });

    getDOM(`.${domStrs.recipeItem}[href="#${id}"]`).classList.add(domStrs.selectedRecipe);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons
    renderBtns(page, recipes.length, resPerPage);
};

/** Pasta with tomato and spinach
 * acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
 * acc: 0 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
 * acc: 0 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 0 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
 * acc: 0 / acc + cur.length = 25 / newTitle = ['Pasta', 'with', 'tomato']
 */
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')}...`;
    }

    return title;
}

function renderRecipe(recipe) {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    dome.searchResList.insertAdjacentHTML('beforeend', markup);
};

function createBtn(page, type) {
    let whichPage = type === 'prev' ? page - 1 : page + 1;

    return `
        <button class="${domStrs.pagBtn} results__btn--${type}" data-goto=${whichPage}>
            <span>Page ${whichPage}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;
}

function renderBtns(page, numResults, resPerPage) {
    const pages = Math.ceil(numResults / resPerPage);
    let btn;

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        btn = createBtn(page, 'next');
    } else if (page < pages) {
        // Both buttons
        btn = `
            ${createBtn(page, 'prev')}
            ${createBtn(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        btn = createBtn(page, 'prev');
    }

    dome.searchResPages.insertAdjacentHTML('afterbegin', btn);
};