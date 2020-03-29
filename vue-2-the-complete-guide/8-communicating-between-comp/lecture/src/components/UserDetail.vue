<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User name: {{ reverseName() }}</p>
        <p>User age: {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    props: {
        // myName: String
        // myName: [String, Array]
        // myName: {
        //     type: String,
        //     required: true
        // }
        // myName: {
        //     type: Object,
        //     default: () => { return { name: 'Fulano' } }
        // }
        myName: {
            type: String,
            default: 'Fulano'
        },
        resetFn: Function,
        userAge: Number
    },
    methods: {
        reverseName() {
            return this.myName
                .split('')
                .reverse()
                .join('');
        },
        resetName() {
            this.myName = 'Max';
            this.$emit('nameWasReset', this.myName);
        }
    },
    created() {
        eventBus.$on('ageWasEdited', age => {
            this.userAge = age;
        });
    }
};
</script>

<style scoped>
div {
    background-color: lightcoral !important;
}
</style>
