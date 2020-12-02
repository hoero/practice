<template>
    <div class="container">
        <div class="row">
            <div
                class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
            >
                <h1>Filters & Mixins</h1>
                <!-- Exercise 1) -->
                <!-- Build a local Filter which reverses the Text it is applied on -->
                <p>{{ 'Reverse' | reverseIt }}</p>

                <!-- Exercise 2 -->
                <!-- Build a global Filter which counts the length of a word and it appends it -->
                <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
                <p>{{ 'Global' | count }}</p>
                <hr />

                <!-- Exercise 3 -->
                <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
                <p>{{ reverses }}</p>
                <p>{{ counts }}</p>

                <!-- Exercise 4 -->
                <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
            </div>
        </div>
    </div>
</template>

<script>
import { txtMixin } from './txtMixin';

export default {
    data() {
        return { txt: 'Computed' };
    },
    filters: {
        reverseIt(val) {
            return val
                .split('')
                .reverse()
                .join('');
        }
    },
    computed: {
        reverses() {
            return this.txt
                .split('')
                .reverse()
                .join('');
        }
    },
    mixins: [txtMixin]
};
</script>

<style></style>
