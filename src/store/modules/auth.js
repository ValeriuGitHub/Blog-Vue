import axios from "axios";

const token = localStorage.getItem('token');

const state = {
	status: '',
	token: token ? `Bearer ${token}` : null,
	user: null,
	userId: null
};

const mutations = {
	'AUTH_REQUEST'(state) {
		state.status = 'loading...'
	},
	'AUTH_SUCCESS'(state, userData) {
		state.status = ''
		state.token = userData.token
		state.userId = userData.userId
		state.user = userData.user
	},
	'AUTH_ERROR'(state){
		state.status = "This account is not registered (wrong email or password)."
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
	loginRequest({commit, dispatch}, user){
		return new Promise((resolve, reject) => {
			commit('AUTH_REQUEST')
			axios({url: '/auth/login', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const userId = resp.data.userId
					commit('AUTH_SUCCESS', {
						token: token,
						user: user,
						userId: userId
					})
					localStorage.setItem('token', token)
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
					const now = new Date()
					const expirationDate = new Date(now.getTime() + 3600 * 1000)
					localStorage.setItem('expirationDate', expirationDate)
					localStorage.setItem('user', JSON.stringify(user))
					localStorage.setItem('userId', userId)
					console.log(user.email)
					dispatch('setLogoutTimer', 3600)
					resolve(resp)
				})
				.catch(err => {
					commit('AUTH_ERROR')
					localStorage.removeItem('token')
					reject(err)
				})
			})
	},
	register({commit, dispatch}, user){
		axios({url: '/auth/signup', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const userId = resp.data.userId
				commit('AUTH_SUCCESS', {
					token: token,
					user: user,
					userId: userId
				})
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				const now = new Date()
				const expirationDate = new Date(now.getTime() + 3600 * 1000)
				localStorage.setItem('expirationDate', expirationDate)
				localStorage.setItem('user', JSON.stringify(user))
				localStorage.setItem('userId', userId)
				dispatch('setLogoutTimer', 3600)
			})
			.catch(err => {
				commit('AUTH_ERROR')
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
		const user = JSON.parse(localStorage.getItem('user'))
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		commit('AUTH_SUCCESS', {
			token: token,
			userId: userId,
			user: user
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