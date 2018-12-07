export const domStrs = {
    searchForm: 'search',
    searchInput: 'search__field',
    searchRes: 'results',
    searchResList: 'results__list',
    searchResPages: 'results__pages',
    pagBtn: 'btn-inline',
    loader: 'loader',
    recipe: 'recipe',
    recipeItem: 'results__link',
    selectedRecipe: 'results__link--active',
    recipeServings: 'recipe__info-data--people',
    recipeIng: 'recipe__count',
    incBtn: 'btn-increase',
    decBtn: 'btn-decrease',
    shoppingList: 'shopping__list',
    shoppingItem: 'shopping__item',
    shoppingCountVal: 'shopping__count-value',
    addBtn: 'recipe__btn--add',
    deleteBtn: 'shopping__delete',
    likeBtn: 'recipe__love',
    likeIconParent: 'recipe__love use',
    likedIcon: 'icon-heart',
    likeIcon: 'icon-heart-outlined',
    likesMenu: 'likes__field',
    likesList: 'likes__list',
    likesLink: 'likes__link'
};

export const getDOM = el => document.querySelector(el);

export const dome = {
    searchForm: getDOM(`.${domStrs.searchForm}`),
    searchInput: getDOM(`.${domStrs.searchInput}`),
    searchRes: getDOM(`.${domStrs.searchRes}`),
    searchResList: getDOM(`.${domStrs.searchResList}`),
    searchResPages: getDOM(`.${domStrs.searchResPages}`),
    recipe: getDOM(`.${domStrs.recipe}`),
    shoppingList: getDOM(`.${domStrs.shoppingList}`),
    likesMenu: getDOM(`.${domStrs.likesMenu}`),
    likesList: getDOM(`.${domStrs.likesList}`)
};

export const renderLoader = parent => {
    const loader = `
        <div class="${domStrs.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = getDOM(`.${domStrs.loader}`);

    if (loader) loader.parentElement.removeChild(loader);
};
