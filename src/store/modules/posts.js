import axios from "axios";

const state = {
	posts: [],
	editPost: [],
	totalItems: 0
};

const mutations = {
	'POST_MESSAGE'(state, resp) {
		state.posts.posts.push(resp.data.post)
	},
	'EDIT_POST'(state, resp) {
		state.editPost = resp.data;
	},
	'GET_POSTS'(state, resp) {
		state.totalItems = resp.data.totalItems
		state.posts = resp.data
	},
	'DELETE_POST'(state, id) {
		const index = state.posts.posts.findIndex(task => task._id === id);
		if (index !== -1) state.posts.posts.splice(index, 1);
	},
	'CHANGE_POST'(state, resp) {
		const index = state.posts.posts.findIndex(task => task._id === resp.data.post._id);
		if (index === -1) {
			state.posts.posts.push(resp.data.post);
		} else {
			Object.assign(state.posts.posts[index], resp.data.post);
		}
	}
};

const actions = {
	postMessage: ({commit}, formData) => {
		axios({url: '/feed/post', data: formData, method: 'POST' })
			.then(resp => {
				commit('POST_MESSAGE', resp)
			})
			.catch(err => {
				throw err
			})
	},
	editPost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'GET' })
			.then(resp => {
				commit('EDIT_POST', resp)
			})
			.catch(err => {
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
				throw err
			})
	},
	changePost: ({commit}, { formData, id }) => {
		axios({url: `/feed/post/${id}`, data: formData, method: 'PUT' })
			.then(resp => {
				commit('CHANGE_POST', resp)
			})
			.catch(err => {
				alert("You can't change this!")
				throw err
			})
	},
	deletePost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'DELETE' })
			.then(resp => {
				commit('DELETE_POST', id)
			})
			.catch(err => {
				alert("You can't delete this!")
				throw err
			})
	}
};

const getters = {
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