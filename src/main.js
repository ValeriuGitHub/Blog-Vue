import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate)

import App from './App.vue';
import router from './routes';
import store from './store/store';
import apiConfig from './configs/api.config';

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
