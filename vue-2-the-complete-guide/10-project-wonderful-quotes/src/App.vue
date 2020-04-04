<template>
    <div class="container">
        <appHeader :count="quotes.length" :max="max"></appHeader>
        <newQuote @quoteAdded="newQuote"></newQuote>
        <quoteGrid :quotes="quotes" @quoteDeleted="deleteQuote"></quoteGrid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on a Quote to delete it!</div>
            </div>
        </div>
    </div>
</template>

<script>
import QuoteGrid from './components/QuoteGrid.vue';
import NewQuote from './components/NewQuote.vue';
import Header from './components/Header.vue';

export default {
    data() {
        return {
            quotes: ['Ut ad corporis ea repellendus dolor hic qui at.'],
            max: 10
        };
    },
    components: { QuoteGrid, NewQuote, appHeader: Header },
    methods: {
        newQuote(quote) {
            if (this.quotes.length >= this.max)
                return alert('Please delete a Quote first!');
            this.quotes.push(quote);
        },
        deleteQuote(i) {
            this.quotes.splice(i, 1);
        }
    }
};
</script>

<style>
</style>
