import Vue from 'vue'
import App from './App.vue'
import Header from './layout/Header.vue'
import Main from './layout/Main.vue'
import Footer from './layout/Footer.vue'

export const serverBus = new Vue()

Vue.config.productionTip = false
Vue.component('Header', Header)
Vue.component('Main', Main)
Vue.component('Footer', Footer)

new Vue({
  render: h => h(App),
}).$mount('#app')
