<template id="pagination-template" lang="pug">
	div.pagination
		div.pagination__left
			a(href="#" v-if="hasPrev()" @click.prevent="changePage(prevPage)"
				).pagination__link Prev
		div.pagination__mid
			ul.pagination__mid-list
				li(v-if="hasFirst()")
					a(href="#" @click.prevent="changePage(1)").pagination__link 1
				li(v-if="hasFirst()") ...
				li(v-for="page in pages")
					a(href="#" @click.prevent="changePage(page)"
						:class="{ current: current == page }").pagination__link
						| {{ page }}
				li(v-if="hasLast()") ...
				li(v-if="hasLast()")
					a(href="#" @click.prevent="changePage(totalPages)").pagination__link
						| {{ totalPages }}
		div.pagination__right
			a(href="#" v-if="hasNext()" @click.prevent="changePage(nextPage)").pagination__link.pagination__right-link
				| Next
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			},
			total: {
				type: Number,
				default: 0
			},
			perPage: {
				type: Number,
				default: 5
			},
			pageRange: {
				type: Number,
				default: 2
			}
		},
		computed: {
			pages: function() {
				var pages = []

				for(var i = this.rangeStart; i <= this.rangeEnd; i++) {
					pages.push(i)
				}

				return pages
			},
			rangeStart: function() {
				var start = this.current - this.pageRange

				return (start > 0) ? start : 1
			},
			rangeEnd: function() {
				var end = this.current + this.pageRange

				return (end < this.totalPages) ? end : this.totalPages
			},
			totalPages: function() {
				return Math.ceil(this.total / this.perPage)
			},
			nextPage: function() {
				return this.current + 1
			},
			prevPage: function() {
				return this.current - 1
			}
		},
		methods: {
			hasFirst: function() {
				return this.rangeStart !== 1
			},
			hasLast: function() {
				return this.rangeEnd < this.totalPages
			},
			hasPrev: function() {
				return this.current > 1
			},
			hasNext: function() {
				return this.current < this.totalPages
			},
			changePage: function(page) {
				this.$emit('page-changed', page)
			}
		}
	}
</script>

<style lang="scss">

@import '../.././scss/variables.scss';

.pagination {
	width: 100%;
	height: 44px;
	display: flex;
	justify-content: space-between;
	margin: 30px auto 30px;
	padding: 0 15px;
	max-width: 1170px;
	&__link {
		float: right;
		padding: 0 20px;
		max-width: 160px;
		background-color: transparent;
		border-radius: 4px;
		border: 1px solid #000;
		text-decoration: none;
		margin: 0 6px;
		transition: all .2s ease-in-out;
		display: block;
		text-align: center;
		font-family: Helvetica, Arial, sans-serif;
		font-weight: 300;
		line-height: 42px;
		height: 44px;
		color: #000;
		font-size: 18px;
		&.current {
			border-color: #962323;
			color: #962323;
		}
	}
	&__left {
		float: left;
	}
	&__right {
		float: right;
		&-link {
			float: right;
		}
	}
	&__mid {
		display: flex;
		justify-content: center;
		width: 60%;
		&-list {
			list-style: none;
			padding: 0;
			margin: 0;
			& li {
				display: inline-block;
			}
		}
	}
}

@media (hover) {
 .pagination a:hover {
		border-color: #962323;
		color: #962323;
	}
}

</style>