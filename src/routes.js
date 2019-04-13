import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import Home from './components/Home/Home.vue';
import Story from './components/OurStory/OurStory.vue';
import Recipes from './components/Recipes/Recipes.vue';
import Menu from './components/Menu/Menu.vue';
import Posts from './components/Posts/Posts.vue';
import Post from './components/Posts/Post.vue';
import editPost from './components/Posts/editPost.vue';
import addPost from './components/Posts/addPost.vue';

Vue.use(Router);

let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/our-story',
			name: 'ourStory',
			component: Story,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/recipes',
			name: 'recipes',
			component: Recipes,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/menu',
			name: 'menu',
			component: Menu,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/add-post',
			name: 'addPost',
			component: addPost,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/post',
			name: 'post',
			component: Post,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/edit-post',
			name: 'editpost',
			component: editPost,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/posts',
			name: 'posts',
			component: Posts,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next()
			return
		}
		next('/login')
	} else {
		next()
	}
})

export default router