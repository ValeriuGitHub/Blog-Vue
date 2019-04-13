<template>
	<div class="menu-bg">
		<div class="container">
			<div class="menu">
				<h1 class="title menu__title">Our Menu</h1>
				<ul class="menu__list">
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								TOASTED BREADS & BEEF DRIPPING BUTTER
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								CLUCK & DUCK WINGS
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								BREAD BOARD PLATTER
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								BEEF & BONE MARROW BON BONS
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								STICKY CHIPOTLE CHICKEN
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								GARLIC KING PRAWNS
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								SALT & PEPPER CALAMARI
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
					<li class="menu__item">
						<div class="menu-top">
							<h2 class="menu-top__title">
								ANTIPASTI PLATE
							</h2>
							<div class="menu-top__price">
								20$
							</div>
						</div>
						<div class="menu__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss">

@import '../.././scss/misc.scss';

.menu {
	color: #000;
	&-bg {
		background-color: #f3f4f7;
		padding: 120px 0px 60px;
	}
	&__list {
		@extend %list;
		@extend %clearfix;
	}
	&__item {
		width: calc(50% - 90px);
		font-family: "ProximaNova";
		margin-bottom: 60px;
		float: left;
		margin-right: 90px;
		margin-left: 90px;
		&:nth-child(even) {
			margin-right: 0px;
		}
		&:nth-child(odd) {
			margin-left: 0px;
		}
	}
	&-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		&__title {
			font-size: 16px;
			font-weight: 900;
		}
		&__price {
			color: #c8235d;
			font-size: 16px;
			font-weight: bold;
		}
	}
	&__text {
		color: rgba(#0b0c0d, 0.7);
		font-size: 16px;
		line-height: 1.5;
		font-weight: 900;
	}
	&__title {
		margin-bottom: 100px;
		text-align: center;
	}
}

</style>