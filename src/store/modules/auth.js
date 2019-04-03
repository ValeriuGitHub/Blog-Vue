import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

const token = localStorage.getItem('token');

const state = {
	status: '',
	token: token ? `Bearer ${token}` : null,
	user: null,
	editPost: []
};

const mutations = {
	'AUTH_SUCCESS'(state, { token, user }){
		state.status = 'success'
		state.token = token
		state.user = user
		console.log(state.status);
	},
	'AUTH_ERROR'(state){
		state.status = 'error'
	},
	'LOGOUT'(state){
		state.status = ''
		state.token = ''
	},
	'EDIT_POST'(state, resp) {
		state.editPost = resp.data;
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
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				commit('AUTH_SUCCESS', { token, user })
				resolve(resp)
			})
			.catch(err => {
				commit('AUTH_ERROR')
				localStorage.removeItem('token')
				reject(err)
			})
		})
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
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				commit('AUTH_SUCCESS', { token, user })
				resolve(resp)
			})
			.catch(err => {
				commit('AUTH_ERROR', err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	editPost: ({commit}, id) => {
		console.log(id);
		return new Promise((resolve, reject) => {
			axios({url: `/feed/post/${id}`, method: 'GET' })
			.then(resp => {
				console.log(resp.data)
				commit('EDIT_POST', resp)
				resolve(resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	changePost: ({commit}, { formData, id }) => {
		console.log(id);
		console.log(formData);
		return new Promise((resolve, reject) => {
			axios({url: `/feed/post/${id}`, data: formData, method: 'PUT' })
			.then(resp => {
				console.log(resp.data)
				console.log('change')
				resolve(resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	deletePost: ({commit}, id) => {
		console.log(id);
		return new Promise((resolve, reject) => {
			axios({url: `/feed/post/${id}`, method: 'DELETE' })
			.then(resp => {
				console.log(resp.data)
				console.log('delete')
				resolve(resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	logout({commit}){
		return new Promise((resolve, reject) => {
			commit('LOGOUT')
			localStorage.removeItem('token')
			delete axios.defaults.headers.common['Authorization']
			resolve()
		})
	}
};

const getters = {
	isLoggedIn: state => !!state.token,
	authStatus: state => state.status,
	editPost: state => state.editPost
};

export default {
	state,
	actions,
	mutations,
	getters
};