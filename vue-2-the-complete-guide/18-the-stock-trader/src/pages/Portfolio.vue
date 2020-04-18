<template>
    <div>
        <stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from '../components/portfolio/Stock';

export default {
    computed: {
        ...mapGetters({
            stocks: 'stockPortfolio'
        })
    },
    components: { Stock }
};
</script>
