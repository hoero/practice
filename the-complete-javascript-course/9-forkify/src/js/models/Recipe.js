import axios from 'axios';
import { get, proxy, key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}${get}?key=${key}&rId=${this.id}`);
            const recipe = res.data.recipe;

            this.title = recipe.title;
            this.author = recipe.publisher;
            this.img = recipe.image_url;
            this.url = recipe.source_url;
            this.ingredients = recipe.ingredients;
        } catch (error) {
            console.log(`Something went wrong getting the recipe: ${error}`);
        }
    }

    calcTime() {
        // Assuming that we need 15 mins for each 3 ingredients
        const quantity = this.ingredients.length;
        const periods = Math.ceil(quantity / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
};
