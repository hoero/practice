import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.http.options.root = 'https://vue-http-e73cf.firebaseio.com/';
Vue.http.interceptors.push((req, next) => {
    console.log(req);
    // if (req.method === 'POST') req.method = 'PUT';
    // next(res => {
    //     res.json = () => {
    //         return { messages: res.body };
    //     };
    // });
    next();
});

new Vue({
    render: h => h(App)
}).$mount('#app');
