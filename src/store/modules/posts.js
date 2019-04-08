import axios from "axios";

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
		axios({url: '/feed/post', data: formData, method: 'POST' })
			.then(resp => {
				commit('POST_MESSAGE', resp)
			})
			.catch(err => {
				console.log(err)
				localStorage.removeItem('token')
				throw err
			})
	}
};

const getters = {
	// posts: state => {
	// 	return state.posts;
	// }
};

export default {
	state,
	actions,
	mutations,
	getters
};