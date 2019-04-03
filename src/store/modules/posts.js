import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

const state = {
	posts: []
};

const mutations = {
	'POST_MESSAGE'(state, resp) {
		Object.assign(state.posts, resp.data);
		state.posts.push(state.posts.post);
	}
};

const actions = {
	postMessage: ({commit}, formData) => {
		console.log(formData);
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