<template>
    <div class="container">
        <div class="row">
            <div
                class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            >
                <h1>Filters & Mixins</h1>
                <p>{{ txt | uppercase | lowercase }}</p>
                <hr />
                <input type="text" v-model="filterTxt" />
                <ul>
                    <li v-for="fruit in filtered" :key="fruit">{{ fruit }}</li>
                </ul>
                <hr />
                <list />
            </div>
        </div>
    </div>
</template>

<script>
import List from './components/List';
import { fruitMixin } from './fruitMixin';

export default {
    data() {
        return {
            txt: 'Hello there!'
        };
    },
    filters: {
        uppercase(val) {
            return val.toUpperCase();
        }
    },
    components: {
        List
    },
    mixins: [fruitMixin]
};
</script>

<style></style>
