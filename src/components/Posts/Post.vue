<template lang="pug">
	div.well
		div.media
			div.pull-left
				img.media-object(:src="'https://test-api-04-19.herokuapp.com/' + post.imageUrl")
			div.media-body
				h4.media-heading {{ post.title }}
				p {{ post.content }}
				div.list-inline.list-unstyled
					form(@submit.prevent="editPost").edit-form
						button.edit-button(:post="post") Edit
</template>

<script>
	export default {
		props: ['post'],
		data() {
			return {
				id: this.post._id
			}
		},
		methods: {
			editPost() {
				this.$store.dispatch('editPost', this.id)
			 .then(() => this.$router.push('/edit-post'))
			 .catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="scss">

.well {
	background-color: brown;
	border: 1.1px solid #fff;
}
.edit {
	&-form {
		margin-left: auto;
	}
	&-button {
		padding: 12.5px 30px;
		font-size: 16px;
	}
}
.media {
	display: flex;
	&-body {
		display: flex;
		flex-direction: column;
		align-content: space-between;
	}
	&-object {
		object-fit: contain;
		width: 200px;
	}
	&-heading {
		margin-bottom: 20px;
	}
}
.list {
	&-inline {
		display: flex;
		margin-top: auto;
		align-items: flex-end;
	}
}
.post {
	&_icon {
		display: flex;
		justify-content: center;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	&-icon {
		font-size: 20px;
		margin: 0px 5px;
		color: #fff;
		&:hover {
			color: orange;
			transition: 0.3s;
		}
	}
}

</style>