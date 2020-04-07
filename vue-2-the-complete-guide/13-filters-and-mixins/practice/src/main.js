import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('count', val => {
    return val + ' (' + val.length + ')';
});

new Vue({
    render: h => h(App)
}).$mount('#app');
