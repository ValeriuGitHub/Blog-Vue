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

const reqInterceptor = Axios.interceptors.request.use(config => {
	console.log('Request Interceptor', config)
	return config
})
const resInterceptor = Axios.interceptors.response.use(res => {
	console.log('Response Interceptor', res)
	return res
})

Axios.interceptors.request.eject(reqInterceptor)
Axios.interceptors.response.eject(resInterceptor)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
