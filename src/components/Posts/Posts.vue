<template>
	<div>
		<app-post v-for="post in posts" :post="post"></app-post>
	</div>
</template>

<script>
	import Post from './Post.vue';
	import axios from 'axios';

	export default {
		components: {
			appPost: Post
		},
		computed: {
			posts() {
				return this.$store.getters.posts;
			}
		},
		data() {
			return {
				page: 1
			}
		},
		mounted() {
			this.getResults();
		},
		methods: {
			getResults() {
				axios({
					url: `/feed/posts?page=${this.page}&postsPerPage=${5}`, method: 'GET'
				})
					.then(response => {
						console.log(response)
						this.$store.state.posts = response.data
						console.log(this.$store.state.posts);
					});
			}
		}
	}
</script>