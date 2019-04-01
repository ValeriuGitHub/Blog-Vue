<template>
	<div>
		<app-post v-for="post in posts" :post="post"></app-post>
		<pagination
		  :data="laravelData"
			@pagination-change-page="getResults">
				<span slot="prev-nav">&lt; Previous</span>
				<span slot="next-nav">Next &gt;</span>
		</pagination>
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
				laravelData: {}
			}
		},
		mounted() {
			this.getResults();
		},
		methods: {
			getResults(page = 1) {
				axios({url: `/feed/posts?page=${page}&postsPerPage=${5}`, method: 'GET' })
					.then(response => {
						this.laravelData = response.data
						this.$store.state.posts = response.data
					});
			}
		}
	}
</script>