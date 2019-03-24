import axios from "axios";

const state = {
	posts: []
};

const mutations = {
  'POST_MESSAGE'(state, postData) {
  	console.log("mutations");
  	console.log(postData);
  }
};

const actions = {
  postMessage: ({commit}, postData) => {
  	console.log("actions")
    commit('POST_MESSAGE', postData);
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