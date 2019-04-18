<template lang="pug">
	div
		div.container.container-centred
			div.card
				div.card-header
					h3 Post message
					p.notice All fields must be filled including image
				div.card-body
					form(@submit.prevent="postMessage")
						input(
							type="text" name="title" id="title" autocomplete="off" 				placeholder="Enter title of post"
							:class="{invalid: $v.title.$error}"
							class="input-title"
							@blur = "$v.title.$touch()"
							v-model="title"
						)
						p(v-if="$v.title.$error").title-wrong Title can't be empty
						textarea(
							name="message"
							id="message"
							class="post-message"
							:class="{invalid: $v.content.$error}"
							@blur = "$v.content.$touch()"
							cols="30" rows="10"
							placeholder="Write a message and add files if it needs to..."
							v-model="content")
						p(v-if="$v.content.$error").content-wrong Message can't be empty
						<div class="form-group file-submit">
							<div class="file-group">
								input(
									type="file" name="file-1[]" id="file-1"
									data-multiple-caption="{count} files selected"
									class="input-file input-file-1 input"
									multiple=""
									required
									ref="myFiles"
									@change="previewFiles"
									)
								<label for="file-1" class="input-file__label">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" class="input-file__svg">
									<path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
								</svg>
								<span>Choose a image</span></label>
							</div>
								button(
									type="submit"
									:disabled="disabled || $v.$invalid"
									class="btn float-right login_btn")
									| Post
						</div>
		div(v-if="info").container.error-wrapper
			div.error-info {{ info }}
</template>

<script>
	import { required } from 'vuelidate/lib/validators'

	export default {
		data() {
			return {
				content: '',
				title: '',
				disabled: true,
				files: [' ']
			}
		},
		computed: {
			info() {
				return this.$store.getters.info
			}
		},
		validations: {
			content: {
				required
			},
			title: {
				required
			}
		},
		methods: {
			previewFiles() {
				this.files = this.$refs.myFiles.files;
				this.disabled = !this.disabled
			},
			postMessage() {
				this.previewFiles()
				let formData = new FormData();
				formData.append("title", this.title);
				formData.append("content", this.content);
				formData.append("image", this.files[0]);
				this.$store.dispatch('postMessage', formData)
				.then(() => this.$router.push('/posts'))
				.catch(err => console.log(err))
			}
		}
	}

</script>

<style lang="scss">

.invalid {
	border: 1px solid red;
	background-color: #ffc9aa;
}
.title {
	&-wrong {
		margin: 5px;
		font-size: 15px;
	}
}
.content {
	&-wrong {
		margin: 0px 0px 0px 0px;
		font-size: 15px;
	}
}
.post {
	&-message {
		width: 360px;
		border: 2px solid #ccc;
		border-radius: 10px;
		height: 160px;
		color: #000;
		font-family: 'Roboto';
		outline: none;
		font-size: 14px;
		resize: none;
		margin-bottom: 5px;
		padding-top: 7.5px;
		padding-left: 20px;
		&_big {
			width: 450px;
		}
	}
}
.notice {
	font-size: 16px;
	margin: 5px 0px;
}
input::placeholder {
	color: rgba(#000, 0.5);
}
.card {
	padding: 30px 20px;
	&-edit {
		padding: 30px 50px;
	}
}
.file {
	&-submit {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.input-title {
	width: 360px;
	border-radius: 5px;
	padding: 10px 10px;
	border: 2px solid #ccc;
	color: #000;
	font-size: 18px;
	outline: none;
	font-weight: bold;
	text-align: center;
	&_big {
		width: 450px;
	}
}
.input-file {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
	&__svg {
		width: 1em;
		height: 1em;
		vertical-align: middle;
		fill: currentColor;
		margin-top: -0.25em;
		margin-right: 0.25em;
	}
	&__label {
		font-size: 14px;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		display: inline-block;
		overflow: hidden;
		padding: 9px 10px;
		border-radius: 5px;
		margin: 0;
		margin-top: 6px;
	}
}
.input-file-1 + .input-file__label {
	color: #fff6fe;
	background-color: #ff6f61;
	transition: 0.3s;
	&:hover {
		background-color: #fff;
		color: #ff6f61;
		transition: 0.3s;
	}
}

</style>