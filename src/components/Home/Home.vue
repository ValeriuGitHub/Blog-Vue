<template>
	<div class="home-bg">
		<div class="container-centred">
			<div class="home">
				<div class="home-info">
					<h1 class="home-info__title">
						Grandrestaurant
					</h1>
					<p class="home-info__text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">

.home {
	&-bg {
		background: url("../../assets/bg-banner.jpg") repeat;
		background-size: cover;
	}
	&-info {
		&__title {
			text-align: center;
			font-size: 72px;
			font-family: "ProximaNova";
			margin-bottom: 20px;
		}
		&__text {
			font-size: 18px;
			font-family: "ProximaNova";
			width: 54%;
			margin: 0 auto;
			text-align: center;
			font-weight: 600;
			line-height: 1.5;
			letter-spacing: 0.5px;
		}
	}
}

</style>