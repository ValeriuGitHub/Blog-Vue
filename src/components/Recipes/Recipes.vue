<template lang="pug">
	div.recipes-bg
		div.container
			div.recipes
				h1.title.recipes__title Signatures Recipes
				p.text.recipes__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</template>

<style lang="scss">

.recipes {
	&-bg {
		background: url("../../assets/signatures-bg.jpg") no-repeat;
		background-size: cover;
		padding: 120px 0px;
		height: calc(100vh - 50px);
		align-items: center;
		display: flex;
	}
	&__title {
		margin-bottom: 55px;
		text-align: center;
	}
}

</style>