<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="!server">Please select a server</p>
        <pv-else>Server #{{ server.id }} selected, Status: {{ server.status }}</pv-else>
        <hr />
        <button @click="resetStatus">Change to Normal</button>
    </div>
</template>

<script>
import { serverBus } from '../main';

export default {
    data() {
        return { server: null };
    },
    methods: {
        resetStatus() {
            this.server.status = 'Normal';
        }
    },
    created() {
        serverBus.$on('serverSelected', server => {
            this.server = server;
        });
    }
};
</script>

<style scoped>
div {
    border: 1px solid red;
}
</style>