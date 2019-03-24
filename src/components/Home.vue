<template>
	<div class="container-centred">
		<div class="hello-text">Hello, you on a home page. Before post blogs you need to <router-link to="/register" class="signup-link" activeClass="active" tag="a">sign-up</router-link>, if you have account you can just <router-link to="/login" class="sign-link" activeClass="active" tag="a">sign-in</router-link> and start to post blogs.</div>
	</div>
</template>

<style lang="scss">

.hello {
	&-text {
		text-align: center;
		font-size: 21px;
		width: 450px;
		margin: 0 auto;
	}
}

</style>