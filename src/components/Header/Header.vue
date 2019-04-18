<template lang="pug">
	header.header
		nav.navbar.navbar-default
			div.container.centered
				div.navbar-header
					router-link(to="/").navbar-brand Restaurant
				div.collapse.navbar-collapse
					ul.nav.navbar-nav
						router-link(to="/login" activeClass="active" tag="li" v-if="!isLoggedIn")
							a.navbar-nav__link Sign in
						router-link(to="/register" activeClass="active" tag="li" v-if="!isLoggedIn")
							a.navbar-nav__link Sign up
						router-link(to="/our-story" activeClass="active" tag="li")
							a.navbar-nav__link Our Story
						router-link(to="/recipes" activeClass="active" tag="li")
							a.navbar-nav__link Recipes
						router-link(to="/menu" activeClass="active" tag="li")
							a.navbar-nav__link Menu
						router-link(to="/add-post" activeClass="active" tag="li")
							a.navbar-nav__link Add Post
						router-link(to="/posts" activeClass="active" tag="li")
							a.navbar-nav__link Posts
				div.logout-wrapper
					div(v-if="isLoggedIn" activeClass="active").logout
						div(v-if="user").logout__user {{ user }}
						a(@click="logout").logout__link Logout
</template>

<script>

	export default {
		computed : {
			isLoggedIn: function(){ return this.$store.getters.isLoggedIn },
			user () {
				return !this.$store.getters.user ? false : this.$store.getters.user.email
			}
		},
		methods: {
			logout: function () {
				this.$store.dispatch('logout')
				.then(() => {
					this.$router.push('/login')
				})
			}
		},
	}

</script>

<style lang="scss">

@import '../.././scss/variables.scss';

.logout {
	color: #000;
	display: flex;
	align-items: center;
	&__user {
		margin-right: 10px;
	}
	&-wrapper {
		margin-left: auto;
	}
	&__link {
		position: relative;
		display: block;
		padding: 15px;
		cursor: pointer;
		line-height: 20px;
		color: #fff;
		background-color: #000;
		font-size: 16px;
		&:hover {
			opacity: 1;
			color: #fff;
			background-color: $orange;
			text-decoration: none;
		}
	}
}
.navbar {
	margin-bottom: 0px;
	border: 0px;
	&-default {
		border-radius: 0px;
		& {
			.navbar {
				&-brand {
					color: rgba(#000, 0.9);
				}
				&-nav {
					&__link {
						&:hover {
							color: $orange;
						}
					}
					& .active > a {
						background-color: $orange;
						color: rgba(#000, 0.9);
						&:focus, &:hover {
							color: #fff;
							background-color: $orange;
						}
					}
					& > li > a {
						color: rgba(#000, 0.7);
						&:hover {
							color: rgba(#000, 1);
						}
					}
				}
			}
		}
	}
}

</style>