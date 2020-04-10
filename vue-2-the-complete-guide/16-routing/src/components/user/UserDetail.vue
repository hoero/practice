<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <router-link
            class="btn btn-primary"
            tag="button"
            :to="{
                name: 'editUser',
                params: { id: $route.params.id },
                query: { locale: 'en', q: 100 },
                hash: '#data'
            }"
            >Edit User</router-link
        >
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        // if (true) {
        //     next();
        // } else {
        //     next(false);
        // }
        next();
    }
};
</script>
