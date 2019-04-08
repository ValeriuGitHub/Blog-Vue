import axios from "axios";

const token = localStorage.getItem('token');

const state = {
	status: '',
	token: token ? `Bearer ${token}` : null,
	user: null,
	editPost: [],
	posts: [],
	totalItems: 0
};

const mutations = {
	'AUTH_SUCCESS'(state, { token, user }){
		state.status = 'success'
		state.token = token
		state.user = user
	},
	'AUTH_ERROR'(state){
		state.status = 'error'
	},
	'LOGIN_ERROR'(state){

	},
	'LOGOUT'(state){
		state.status = ''
		state.token = ''
	},
	'EDIT_POST'(state, resp) {
		state.editPost = resp.data;
	},
	'GET_POSTS'(state, resp) {
		state.totalItems = resp.data.totalItems
		state.posts = resp.data
	}
};

const actions = {
	login({commit}, user){
		console.log(user)
		axios({url: '/auth/login', data: user, method: 'POST' })
			.then(resp => {
				const user = resp.data.user
				const token = resp.data.token
				const userId = resp.data.userId
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				commit('AUTH_SUCCESS', { token, user })
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
	register({commit}, user){
		axios({url: '/auth/signup', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const user = resp.data.user
				const userId = resp.data.userId
				const message = resp.data.message
				localStorage.setItem('token', token)
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
				commit('AUTH_SUCCESS', { token, user })
			})
			.catch(err => {
				console.log(err)
				commit('AUTH_ERROR', err)
				localStorage.removeItem('token')
				throw err
			})
	},
	getPosts: ({commit}, {perPage, page}) => {
		axios({
			url: `/feed/posts?page=${page}&postsPerPage=${perPage}`, method: 'GET'
		})
			.then(resp => {
				commit('GET_POSTS', resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				throw err
			})
	},
	editPost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'GET' })
			.then(resp => {
				commit('EDIT_POST', resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				throw err
			})
	},
	changePost: ({commit}, { formData, id }) => {
		axios({url: `/feed/post/${id}`, data: formData, method: 'PUT' })
			.then(resp => {} )
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				throw err
			})
	},
	deletePost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'DELETE' })
			.then(resp => {} )
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				throw err
			})
	},
	logout({commit}){
		commit('LOGOUT')
		localStorage.removeItem('token')
		delete axios.defaults.headers.common['Authorization']
	}
};

const getters = {
	isLoggedIn: state => !!state.token,
	authStatus: state => state.status,
	editPost: state => state.editPost,
	posts: state => state.posts.posts,
	totalItems: state => state.totalItems
};

export default {
	state,
	actions,
	mutations,
	getters
};