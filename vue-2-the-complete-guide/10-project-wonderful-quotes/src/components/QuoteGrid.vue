<template>
    <div class="row">
        <quote v-for="(quote, i) in quotes" :key="quote" @click.native="deleteQuote(i)">{{quote}}</quote>
    </div>
</template>

<script>
import Quote from './Quote';

export default {
    props: ['quotes'],
    components: { Quote },
    methods: {
        deleteQuote(i) {
            this.$emit('quoteDeleted', i);
        }
    }
};
</script>

<style>
</style>