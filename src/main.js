import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import App from './App.vue';
import router from './routes';
import store from './store/store';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
