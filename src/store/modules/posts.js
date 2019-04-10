import axios from "axios";

const state = {
	posts: [],
	editPost: [],
	totalItems: 0
};

const mutations = {
	'POST_MESSAGE'(state, resp) {

	},
	'EDIT_POST'(state, resp) {
		state.editPost = resp.data;
	},
	'GET_POSTS'(state, resp) {
		state.totalItems = resp.data.totalItems
		state.posts = resp.data
	},
	'DELETE_POST'(state, id) {
    // const index = state.editPost.findIndex(task => task._id === id);
    // if (index !== -1) state.editPost.splice(index, 1);
	},
	'CHANGE_POST'(state, id) {

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
				throw err
			})
	},
	changePost: ({commit}, { formData, id }) => {
		axios({url: `/feed/post/${id}`, data: formData, method: 'PUT' })
			.then(resp => {
				commit('CHANGE_POST', id)
			})
			.catch(err => {
				console.log(err)
				throw err
			})
	},
	deletePost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'DELETE' })
			.then(resp => {
				commit('DELETE_POST', id)
			})
			.catch(err => {
				console.log(err)
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