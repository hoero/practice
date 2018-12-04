import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const search = 'https://food2fork.com/api/search';
        const get = 'https://www.food2fork.com/api/get'
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'cb99539ddde70fdc3ea19415aff4c51f';

        try {
            const res = await axios(`${proxy}${search}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error)
        }
    }
}