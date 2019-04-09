import axios from "axios";

const token = localStorage.getItem('token');

const state = {
	status: '',
	token: token ? `Bearer ${token}` : null,
	user: null,
	userId: null
};

const mutations = {
	'AUTH_USER' (state, userData) {
		state.token = userData.token
		state.userId = userData.userId
		state.user = userData.user
	},
	'AUTH_ERROR'(state){
		state.status = 'error'
	},
	'LOGIN_ERROR'(state){

	},
	'LOGOUT'(state){
		state.status = ''
		state.token = ''
	}
};

const actions = {
	setLogoutTimer({commit}, expirationTime) {
		setTimeout(() => {
			commit('LOGOUT')
		}, expirationTime * 1000)
	},
	login({commit, dispatch}, user){
		axios({url: '/auth/login', data: user, method: 'POST' })
			.then(resp => {
				const user = resp.data.user
				const token = resp.data.token
				const userId = resp.data.userId
				commit('AUTH_USER', {
					token: token,
					user: user,
					userId: userId
				})
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				const now = new Date()
				const expirationDate = new Date(now.getTime() + 3600 * 1000)
				localStorage.setItem('expirationDate', expirationDate)
				localStorage.setItem('userId', userId)
				dispatch('setLogoutTimer', 3600)
			})
			.catch(err => {
				console.log(err)
				user.getin = false;
				console.log(user)
				commit('LOGIN_ERROR')
				localStorage.removeItem('token')
				throw user.getin
			})
	},
	register({commit, dispatch}, user){
		axios({url: '/auth/signup', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const user = resp.data.user
				const userId = resp.data.userId
				commit('AUTH_USER', {
					token: token,
					user: user,
					userId: userId
				})
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				const now = new Date()
				const expirationDate = new Date(now.getTime() + 3600 * 1000)
				localStorage.setItem('expirationDate', expirationDate)
				localStorage.setItem('userId', userId)
				dispatch('setLogoutTimer', 3600)
			})
			.catch(err => {
				console.log(err)
				commit('AUTH_ERROR', err)
				localStorage.removeItem('token')
				throw err
			})
	},
	tryAutoLogin: ({commit}) => {
		const token = localStorage.getItem('token')
		if (!token) {
			return
		}
		const expirationDate = localStorage.getItem('expirationDate')
		const now = new Date()
		if (now >= expirationDate) {
			return
		}
		const userId = localStorage.getItem('userId')
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		commit('AUTH_USER', {
			token: token,
			userId: userId
		})
	},
	logout({commit}){
		commit('LOGOUT')
		localStorage.removeItem('token')
		localStorage.removeItem('expirationDate')
		localStorage.removeItem('userId')
		delete axios.defaults.headers.common['Authorization']
	}
};

const getters = {
	isLoggedIn: state => !!state.token,
	user: state => state.user,
	authStatus: state => state.status
};

export default {
	state,
	actions,
	mutations,
	getters
};