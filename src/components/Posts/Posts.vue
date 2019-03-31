<template>
	<div>
		<app-post v-for="post in posts" :post="post"></app-post>
		<app-pagination></app-pagination>
	</div>
</template>

<script>
	import Post from './Post.vue';
	import Pagination from './Pagination.vue';
	import axios from 'axios';

	export default {
		components: {
			appPost: Post,
			appPagination: Pagination
		},
		computed: {
			posts() {
				return this.$store.getters.posts;
			}
		},
		created() {
			return new Promise((resolve, reject) => {
				axios({url: `/feed/posts?page=${1}&postsPerPage=${5}`, method: 'GET' })
					.then(resp => {
						this.$store.state.posts = resp.data;
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
	}
</script>