import axios from 'axios';
import { search, proxy, key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        try {
            const res = await axios(`${proxy}${search}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            console.log(`Something wrong with your search: ${error}`);
        }
    }
};