<template lang="pug">
	div.menu-bg
		div.container
			div.menu
				h1.title.menu__title Our Menu
				ul.menu__list
					li.menu__item
						div.menu-top
							h2.menu-top__title TOASTED BREADS & BEEF DRIPPING BUTTER
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title CLUCK & DUCK WINGS
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title BREAD BOARD PLATTER
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title BEEF & BONE MARROW BON BONS
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title STICKY CHIPOTLE CHICKEN
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title GARLIC KING PRAWNS
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title SALT & PEPPER CALAMARI
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					li.menu__item
						div.menu-top
							h2.menu-top__title ANTIPASTI PLATE
							div.menu-top__price 20$
						div.menu__text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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