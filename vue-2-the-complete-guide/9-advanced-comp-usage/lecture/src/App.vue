<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <!-- <quote>
                    <h2>{{ title }}</h2>
                    <p>A wonderful quote</p>
                </quote>
                <quotes>
                    <h2 slot="title">{{ title }}s</h2>
                    <p slot="content">Another wonderful quote</p>
                </quotes>-->
                <button @click="selected = 'Quote'">Quote</button>
                <button @click="selected = 'New'">New</button>
                <button @click="selected = 'Author'">Author</button>
                <hr />
                <keep-alive>
                    <component :is="selected">
                        <p>Default content</p>
                    </component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import Quote from './components/Quote.vue';
import Quotes from './components/Quotes.vue';
import New from './components/New.vue';
import Author from './components/Author.vue';

export default {
    data() {
        return {
            title: 'The Quote',
            selected: 'Quote'
        };
    },
    components: {
        Quote,
        Quotes,
        New,
        Author
    }
};
</script>

<style scoped>
h2 {
    color: red;
}
</style>
