<template lang="pug">
	div.story
		div.story-bg
			div.container
				div.story-left
					img(src="../../assets/story-img.jpg" alt="").story-left__img
				div.story-right
					h1.title.title_after-white.story-right__title Our Story
					p.text.story-right__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</template>

<style lang="scss">

@import '../.././scss/misc.scss';

.story {
	&-bg {
		background-color: #962323;
		padding: 120px 0px;
		@extend %clearfix;
		height: calc(100vh - 50px);
		align-items: center;
		display: flex;
	}
	&-left {
		float: left;
		width: 50%;
		&__img {
			width: 450px;
		}
	}
	&-right {
		width: 50%;
		padding-top: 20px;
		float: left;
		text-align: center;
		@extend %clearfix;
		&__title {
			margin-bottom: 55px;
		}
	}
}

</style>