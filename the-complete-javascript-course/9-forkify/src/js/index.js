import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
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
            recipeView.renderRecipe(model.recipe, model.likes.isLiked(id));
        } catch (error) {
            console.log(`Error processing recipe: ${error}`);
        }
    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));


// Shopping controller
// -------------------
const controlShop = () => {
    // 1. Create a new list IF there's none yet
    if (!model.list) model.list = new List();

    // 2. Add each ingredient to the list and UI
    model.recipe.ingredients.forEach(el => {
        const item = model.list.addItem(el.count, el.unit, el.ingredient);

        listView.renderItem(item);
    });
};

// Handling delete/update list item events
dome.shoppingList.addEventListener('click', e => {
    const id = e.target.closest(`.${domStrs.shoppingItem}`).dataset.itemid;

    // Handle the delete button
    if (e.target.matches(`.${domStrs.deleteBtn}, .${domStrs.deleteBtn} *`)) {
        // Delete from model
        model.list.deleteItem(id);
        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches(`.${domStrs.shoppingCountVal}`)) {
        const val = parseFloat(e.target.value, 10);

        model.list.updateCount(id, val);
    }
});


// Likes controller
// ----------------
const controlLikes = () => {
    if (!model.likes) model.likes = new Likes();
    const currentID = model.recipe.id;

    // User has NOT liked the current recipe yet
    if (!model.likes.isLiked(currentID)) {
        // 1. Add like to the state
        const newLike = model.likes.addLike(
            currentID,
            model.recipe.title,
            model.recipe.author,
            model.recipe.img
        );

        // 2. Toggle the like button
        likesView.toggleLikeBtn(true);

        // 3. Add like to the UI list
        likesView.renderLike(newLike);

        // User HAS liked the current recipe
    } else {
        // 1. Add like to the state
        model.likes.deleteLike(currentID);

        // 2. Toggle the like button
        likesView.toggleLikeBtn(false);

        // 3. Add like to the UI list
        likesView.deleteLike(currentID);
    }

    likesView.toggleLikeMenu(model.likes.getCount());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
    model.likes = new Likes();

    // Restore likes
    model.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(model.likes.getCount());

    // Render existing likes
    model.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling recipe button clicks
// ----------------
dome.recipe.addEventListener('click', e => {
    if (e.target.matches(`.${domStrs.decBtn}, .${domStrs.decBtn} *`)) {
        // Decrease button is clicked
        if (model.recipe.servings > 1) {
            model.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(model.recipe);
        }
    } else if (e.target.matches(`.${domStrs.incBtn}, .${domStrs.incBtn} *`)) {
        // Increase button is clicked
        model.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(model.recipe);
    } else if (e.target.matches(`.${domStrs.addBtn}, .${domStrs.addBtn} *`)) {
        // Add ingredients to the shopping list
        controlShop();
    } else if (e.target.matches(`.${domStrs.likeBtn}, .${domStrs.likeBtn} *`)) {
        // Add recipe to the likes list
        controlLikes();
    }
});