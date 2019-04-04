<template>
	<div class="container container-centred">
		<div class="card card-edit edit-card">
			<div class="card-header edit-header">
				<h3>Edit Post</h3>
				<form @submit.prevent="deletePost" class="edit-remove__container">
					<button class="edit-remove">
						Remove Post
					</button>
				</form>
			</div>
			<div class="card-body">
				<form>
					<input
						type="text" name="title" id="title" autocomplete="off"
						:placeholder="editPost.title"
						class="edit-title input-title input-title_big"
						v-model="title">
					<textarea
						name="message" id="message" class="edit-content post-message  post-message_big"
						cols="30" rows="10"
						:placeholder="editPost.content"
						v-model="content">
					</textarea>
					<div class="form-group file-submit">
						<div class="file-group">
							<input
								type="file" name="file-1[]" id="file-1"
								data-multiple-caption="{count} files selected"
								class="inputfile inputfile-1"
								multiple=""
								ref="myFiles"
								@change="previewFiles">
							<label for="file-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
								<path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
							</svg>
							<span>Choose another file…</span></label>
						</div>
						<form @submit.prevent="changePost">
							<button
								type="submit"
								class="btn float-right login_btn login_btn_big">
								Change Post
							</button>
						</form>
					</div>
				</form>
			</div>
			<div class="border-top card-body text-center">
				<router-link to="/posts" class="back-link" activeClass="active" tag="a">
					Cancel changes
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				files: []
			}
		},
		computed: {
			editPost() {
				return this.$store.getters.editPost.post;
			}
		},
		methods: {
			previewFiles() {
				this.files = this.$refs.myFiles.files;
			},
			changePost() {
				this.previewFiles()
				let formData = new FormData();
				formData.append("title", this.title);
				formData.append("content", this.content);
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

.edit {
	&-card {
		width: 550px;
		border-radius: 5px;
	}
	&-header {
		display: flex;
		justify-content: center;
	}
	&-title {
		width: 450px;
	}
	&-content {
		width: 450px;
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
