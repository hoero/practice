<template>
    <div>
        <h1>The User Page</h1>
        <hr />
        <button class="btn btn-primary" @click="toHome">Go to Home</button>
        <hr />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push('/');
        }
    }
};
</script>
