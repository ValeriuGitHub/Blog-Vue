<template lang="pug">
	div.container.container-centred
		div.card.card-edit.edit-card
			div(v-if="info").container.error-wrapper
				div.error-info {{ info }}
			div.card-header.edit-header
				h3 Edit Post
				form(@submit.prevent="deletePost").edit-remove__container
					button.edit-remove Remove Post
			div.card-body
				form(@submit.prevent="changePost")
					input(
						type="text" name="title" id="title" autocomplete="off"
						class="edit-title input-title input-title_big"
						v-model="editPost.title")
					textarea(
						name="message" id="message" class="edit-content post-message  post-message_big"
						cols="30" rows="10"
						v-model="editPost.content")
					div.form-group.file-submit
						div.file-group
							input(
								type="file" name="file-1[]" id="file-1"
								data-multiple-caption="{count} files selected"
								class="input-file input-file-1"
								multiple=""
								ref="myFiles"
								@change="previewFiles")
							<label for="file-1" class="input-file__label">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" class="input-file__svg">
								<path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
							</svg>
							<span>Choose another image...</span></label>
						button(
							type="submit"
							:disabled="disabled"
							class="btn float-right login_btn login_btn_big")
							| Change Post
			div.border-top.card-body.text-center
				router-link(to="/posts" activeClass="active" tag="a").back-link Cancel changes
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				disabled: true,
				files: []
			}
		},
		computed: {
			editPost() {
				return this.$store.getters.editPost.post;
			},
			info() {
				return this.$store.getters.info
			}
		},
		methods: {
			previewFiles() {
				this.files = this.$refs.myFiles.files;
				this.disabled = !this.disabled;
			},
			changePost() {
				this.previewFiles()
				let formData = new FormData();
				formData.append("title", this.editPost.title);
				formData.append("content", this.editPost.content);
				formData.append("image", this.files[0]);
				this.$store.dispatch('changePost', {
					formData: formData,
					id: this.editPost._id
				})
				.then(() => this.$router.push('/posts'))
				.catch(err => console.log(err))
			},
			deletePost() {
				this.$store.dispatch('deletePost', this.editPost._id)
				.then(() => this.$router.push('/posts'))
				.catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="scss">

@import '../.././scss/variables.scss';

.invalid {
	border: 1px solid red;
	background-color: #ffc9aa;
}
.edit {
	&-card {
		width: 550px;
		border-radius: 5px;
	}
	&-header {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	&-title {
		width: 450px;
		&__wrong {
			margin: 5px;
			font-size: 15px;
		}
	}
	&-content {
		width: 450px;
		&__wrong {
			margin: 0px 0px 0px 0px;
			font-size: 15px;
		}
	}
	&-remove {
		background-color: orangered;
		padding: 10.6px 12px;
		&:hover {
			background-color: #fff;
			color: red;
		}
		&__container {
			margin-left: auto;
		}
	}
}
.back {
	&-link {
		color: #fff;
		font-weight: bold;
		text-decoration: none;
		margin-top: 20px;
		&:hover {
			color: $orange;
			text-decoration: none;
		}
	}
}

</style>
