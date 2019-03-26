import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'

const state = {
	posts: []
};

const mutations = {
  'POST_MESSAGE'(state, formData) {
  	console.log(formData.files);
  	state.posts.push(formData);
  },
  'EDIT_MESSAGE'(state) {
  	console.log("edit");
  }
};

const actions = {
  postMessage: ({commit}, formData) => {
    // commit('POST_MESSAGE', postData);
		return new Promise((resolve, reject) => {
			axios({url: '/feed/post', data: formData, method: 'POST' })
			.then(resp => {
				console.log(formData)
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
  editMessage: ({commit} ) => {
		commit('EDIT_MESSAGE' );
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