import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.has) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    console.log('Global beforeEach');
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
