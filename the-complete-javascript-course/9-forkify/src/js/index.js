// Global app controller
import Search from './models/Search'

/** Gloabl state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const model = {};

const controlSearch = async () => {
    // 1. Get query from the view
    const query = 'pizza'; // TODO

    if (query) {
        // 2. New search object and add to model
        model.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for recipes
        await model.search.getResults();

        // 5. Render results on UI
        console.log(model.search.result);
    }

}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
