import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { domStrs, dome, renderLoader, clearLoader } from './views/base'

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const model = {};

// Search controller
// -----------------
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

        try {
            // 4. Search for recipes
            await model.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(model.search.result);
        } catch (error) {
            clearLoader();
            console.log(`Something wrong with your search: ${error}`);
        }
    }

};

// Handling form submit
dome.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Handling pagination buttons
dome.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${domStrs.pagBtn}`);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);

        searchView.clearResults();
        searchView.renderResults(model.search.result, goToPage);
    }
})


// Recipe controller
// -----------------
const controlRecipe = async () => {
    // 1. Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2. Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(dome.recipe);
        // Highlight selected search item
        if (model.search) searchView.highlightSelected(id);

        // 3. Create new recipe object
        model.recipe = new Recipe(id);

        try {
            // 4. Get recipe data and parse ingredients
            await model.recipe.getRecipe();
            model.recipe.parseIngredients();

            // 5. Calculate servings and time
            model.recipe.calcTime();
            model.recipe.calcServings();

            // 6. Render recipe
            clearLoader();
            recipeView.renderRecipe(model.recipe);
        } catch (error) {
            console.log(`Error processing recipe: ${error}`);
        }
    }
}

// ['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

// Handling recipe button clicks
dome.recipe.addEventListener('click', e => {
    if (e.target.matches(`.${domStrs.decBtn}, .${domStrs.decBtn} * `)) {
        // Decrease button is clicked
        if (model.recipe.servings > 1) {
            model.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(model.recipe);
        }
    } else if (e.target.matches(`.${domStrs.incBtn}, .${domStrs.incBtn} * `)) {
        // Increase button is clicked
        model.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(model.recipe);
    }
});

// Shopping controller
// -------------------


// Likes controller
// ----------------
