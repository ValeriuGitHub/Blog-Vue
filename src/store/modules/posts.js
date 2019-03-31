import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

const state = {
	posts: [],
	editPost: [],
	page: 0
};

const mutations = {
	'POST_MESSAGE'(state, resp) {
		Object.assign(state.posts, resp.data);
		state.posts.push(state.posts.post);
	}
};

const actions = {
	postMessage: ({commit}, formData) => {
		return new Promise((resolve, reject) => {
			axios({url: '/feed/post', data: formData, method: 'POST' })
			.then(resp => {
				console.log(resp.data)
				commit('POST_MESSAGE', resp)
				resolve(resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	},
	editPost: ({commit}, id) => {
		console.log(id);
		return new Promise((resolve, reject) => {
			axios({url: `/feed/post/:${id}`, method: 'GET' })
			.then(resp => {
				console.log(resp.data)
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
		return new Promise((resolve, reject) => {
			axios({url: `/feed/post/:${id}`, data: formData, method: 'PUT' })
			.then(resp => {
				console.log(resp.data)
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
			axios({url: `/feed/post/:${id}`, method: 'DELETE' })
			.then(resp => {
				console.log(resp.data)
				resolve(resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				reject(err)
			})
		})
	}
};

const getters = {
	posts: state => {
		return state.posts;
	}
};

export default {
	state,
	actions,
	mutations,
	getters
};