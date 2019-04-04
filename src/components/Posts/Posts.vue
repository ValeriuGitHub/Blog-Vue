<template>
	<div>
		<app-post v-for="post in posts" :post="post"></app-post>
		<app-pagination
			:current="currentPage"
			:total="totalItems"
			:per-page="perPage"
			@page-changed="getResults"
		></app-pagination>
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
		data() {
			return {
				currentPage: 1,
				pages: [],
				totalItems: 0,
				perPage: 5
			}
		},
		mounted() {
			this.getResults();
		},
		methods: {
			getResults(page = 1) {
				console.log(page)
				axios({
					url: `/feed/posts?page=${page}&postsPerPage=${this.perPage}`, method: 'GET'
				})
					.then(response => {
						console.log(response)
						this.currentPage = page
						this.totalItems = response.data.totalItems
						this.$store.state.posts = response.data
					});
			}
		}
	}
</script>

<style lang="scss">

@import '../.././scss/misc.scss';
@import '../.././scss/variables.scss';

.page {
	&__wrapper {
		padding-bottom: 40px;
		padding-top: 20px;
	}
	&__list	{
		display: flex;
		justify-content: center;
		@extend %list;
	}
	&__link {
		text-decoration: none;
		font-size: 14px;
		color: #000;
		display: block;
		padding: 7.5px 12.5px;
		font-weight: bold;
		text-align: center;
		background-color: #fff;
		border: 1px solid blue;
		&:hover {
			color: $orange;
			text-decoration: none;
		}
	}
}

</style>