<template>
	<div class="container container-centred">
		<div class="card">
			<div class="card-header">
				<h3>Post message</h3>
			</div>
			<div class="card-body">
				<form>
					<input
						type="text" name="title" id="title" autocomplete="off" 						placeholder="Enter title of post"
						class="input-title"
						v-model="title">
					<textarea
						name="message" id="message" class="post-message" cols="30" rows="10" placeholder="Write a message and add files if it needs to..."
						v-model="message">
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
							<span>Choose a file…</span></label>
						</div>
						<input @click="postMessage" value="Post" class="btn float-right login_btn">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['post'],
    data() {
      return {
        message: '',
        title: '',
        files: []
      }
    },
		methods: {
			previewFiles() {
		    this.files = this.$refs.myFiles.files;
		  },
			postMessage() {
        this.previewFiles()
        const postData = {
          title: this.title,
          message: this.message,
          files: this.files
        };
        console.log(this.title);
        console.log(this.message);
        console.log(this.files)
				this.$store.dispatch('postMessage', postData);
			}
		}
	}

</script>

<style lang="scss">

@import '../.././scss/index.scss';

.post {
	&-message {
		width: 360px;
    border: 2px solid darkgoldenrod;
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
    text-align: justify;
	}
}
input::placeholder {
	color: rgba(#000, 0.5);
}
.file {
	&-submit {
		display: flex;
		justify-content: space-between;
    align-items: center;
    padding: 0 6px;
	}
}
.input-title {
  width: 360px;
  border-radius: 5px;
  padding: 10px 10px;
  border: 2px solid darkgoldenrod;
  color: #000;
  font-size: 18px;
  outline: none;
  font-weight: bold;
  text-align: center;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  & + label {
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
    & svg {
	    width: 1em;
	    height: 1em;
	    vertical-align: middle;
	    fill: currentColor;
	    margin-top: -0.25em;
	    margin-right: 0.25em;
    }
  }
}
.inputfile-1 + label {
  color: #fff6fe;
  background-color: #ff6f61;
}

</style>