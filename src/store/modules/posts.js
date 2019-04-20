import axios from "axios";
import router from '../../routes';

const state = {
	posts: [],
	editPost: [],
	totalItems: 0,
	info: ''
};

const mutations = {
	'POST_MESSAGE'(state, resp) {
		state.posts.posts.unshift(resp.data.post)
	},
	'POST_MESSAGE_ERROR'(state, resp) {
		state.info = "You can't post message now, maybe there are some deal with conection or server"
	},
	'EDIT_POST'(state, resp) {
		state.editPost = resp.data;
		state.info = ''
	},
	'EDIT_POST_ERROR'(state, resp) {
		state.info = "We can't download this page maybe something with conection or server..."
	},
	'GET_POSTS'(state, resp) {
		state.totalItems = resp.data.totalItems
		state.posts = resp.data
		state.info = ''
	},
	'GET_POSTS_ERROR'(state) {
		state.info = "We can't download all posts, maybe something wrong with conection or server..."
	},
	'DELETE_POST'(state, id) {
		const index = state.posts.posts.findIndex(task => task._id === id);
		if (index !== -1) state.posts.posts.splice(index, 1);
	},
	'DELETE_POST_ERROR'(state, id) {
		state.info = "You can't delete this, cause it's not your post!"
	},
	'CHANGE_POST'(state, resp) {
		const index = state.posts.posts.findIndex(task => task._id === resp.data.post._id);
		if (index === -1) {
			state.posts.posts.push(resp.data.post);
		} else {
			Object.assign(state.posts.posts[index], resp.data.post);
		}
	},
	'CHANGE_POST_ERROR'(state, id) {
		state.info = "You can't change this, cause it's not your post!"
	},
};

const actions = {
	postMessage: ({commit}, formData) => {
		axios({url: '/feed/post', data: formData, method: 'POST' })
			.then(resp => {
				commit('POST_MESSAGE', resp)
			})
			.catch(err => {
				commit('POST_MESSAGE_ERROR')
				throw err
			})
	},
	editPost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'GET' })
			.then(resp => {
				commit('EDIT_POST', resp)
			})
			.catch(err => {
				commit('EDIT_POST_ERROR')
				throw err
			})
	},
	getPosts: ({commit, dispatch}, {perPage, page}) => {
		axios({
			url: `/feed/posts?page=${page}&postsPerPage=${perPage}`, method: 'GET'
		})
			.then(resp => {
				commit('GET_POSTS', resp)
			})
			.catch(err => {
				commit('GET_POSTS_ERROR')
				if (err.response.status === 401) {
					dispatch('logout')
					router.push('/login')
				}
				throw err
			})
	},
	changePost: ({commit}, { formData, id }) => {
		axios({url: `/feed/post/${id}`, data: formData, method: 'PUT' })
			.then(resp => {
				commit('CHANGE_POST', resp)
			})
			.catch(err => {
				alert("You can't change this, cause it's not your post!")
				commit('СHANGE_POST_ERROR')
				throw err
			})
	},
	deletePost: ({commit}, id) => {
		axios({url: `/feed/post/${id}`, method: 'DELETE' })
			.then(resp => {
				commit('DELETE_POST', id)
			})
			.catch(err => {
				alert("You can't delete this, cause it's not your post!")
				commit('DELETE_POST_ERROR')
				console.log(err.response.status)
				throw err
			})
	}
};

const getters = {
	editPost: state => state.editPost,
	posts: state => state.posts.posts,
	totalItems: state => state.totalItems,
	info: state => state.info
};

export default {
	state,
	actions,
	mutations,
	getters
};