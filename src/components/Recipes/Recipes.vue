<template>
	<div class="recipes-bg">
		<div class="container">
			<div class="recipes">
				<h1 class="title recipes__title">Signatures Recipes</h1>
				<p class="text recipes__text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
		</div>
	</div>
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