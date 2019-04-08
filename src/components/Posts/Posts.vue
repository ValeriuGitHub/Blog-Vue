<template>
	<div>
		<app-post v-for="post in posts" :post="post"></app-post>
		<app-pagination
			:current="currentPage"
			:total="totalItems"
			:per-page="perPage"
			@page-changed="getPosts"
		></app-pagination>
	</div>
</template>

<script>
	import Post from './Post.vue';
	import Pagination from './Pagination.vue';

	export default {
		components: {
			appPost: Post,
			appPagination: Pagination
		},
		computed: {
			posts() {
				return this.$store.getters.posts;
			},
			totalItems() {
				return this.$store.getters.totalItems;
			}
		},
		data() {
			return {
				currentPage: 1,
				pages: [],
				perPage: 5
			}
		},
		mounted() {
			this.getPosts();
		},
		methods: {
			getPosts(page = 1) {
				let perPage = this.perPage;
				this.$store.dispatch('getPosts', {perPage, page})
				.then(() => { this.currentPage = page })
				.catch(err => console.log(err))
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