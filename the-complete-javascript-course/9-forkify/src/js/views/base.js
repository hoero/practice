export const domStrs = {
    searchForm: 'search',
    searchInput: 'search__field',
    searchRes: 'results',
    searchResList: 'results__list',
    searchResPages: 'results__pages',
    pagBtn: 'btn-inline',
    loader: 'loader'
};


export const dome = {
    searchForm: getDOM(`.${domStrs.searchForm}`),
    searchInput: getDOM(`.${domStrs.searchInput}`),
    searchRes: getDOM(`.${domStrs.searchRes}`),
    searchResList: getDOM(`.${domStrs.searchResList}`),
    searchResPages: getDOM(`.${domStrs.searchResPages}`)
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


function getDOM(el) {
    return document.querySelector(el);
};