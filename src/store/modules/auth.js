import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

const state = {
	status: '',
	token: localStorage.getItem('token') || '',
	user: null
};

const mutations = {
	auth_success(state, { token, user }){
		state.status = 'success'
		state.token = token
		state.user = user
		console.log(state.status);
	},
	auth_error(state){
		state.status = 'error'
	},
	logout(state){
		state.status = ''
		state.token = ''
	}
};

const actions = {
	login({commit}, user){
		return new Promise((resolve, reject) => {
			axios({url: '/auth/login', data: user, method: 'POST' })
			.then(resp => {
				const user = resp.data.user
				const token = resp.data.token
				const userId = resp.data.userId
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = token
				commit('auth_success', { token, user })
				resolve(resp)
			})
			.catch(err => {
				commit('auth_error')
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
  postMessage: ({commit}, formData) => {
    commit('POST_MESSAGE', formData);
		// return new Promise((resolve, reject) => {
		// 	axios({url: '/feed/post', data: formData, method: 'POST' })
		// 	.then(resp => {
		// 		console.log(postData)
		// 		console.log(resp.data)
		// 		resolve(resp)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 		localStorage.removeItem('token')
		// 		reject(err)
		// 	})
		// })
  },
	register({commit}, user){
		return new Promise((resolve, reject) => {
			axios({url: '/auth/signup', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const user = resp.data.user
				const userId = resp.data.userId
				const message = resp.data.message
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = token
				commit('auth_success', { token, user })
				resolve(resp)
			})
			.catch(err => {
				commit('auth_error', err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	logout({commit}){
		return new Promise((resolve, reject) => {
			commit('logout')
			localStorage.removeItem('token')
			delete axios.defaults.headers.common['Authorization']
			resolve()
		})
	}
};

const getters = {
	isLoggedIn: state => !!state.token,
	authStatus: state => state.status,
};

export default {
	state,
	actions,
	mutations,
	getters
};