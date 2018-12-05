// Global app controller
import Search from './models/Search'
import * as searchView from './views/searchView'
import { domStrs, dome, renderLoader, clearLoader } from './views/base'

/** Gloabl state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const model = {};

const controlSearch = async () => {
    // 1. Get query from the view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to model
        model.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(dome.searchRes);

        // 4. Search for recipes
        await model.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(model.search.result);
    }

};

dome.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

dome.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${domStrs.pagBtn}`);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResults();
        searchView.renderResults(model.search.result, goToPage);
    }
})