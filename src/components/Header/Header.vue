<template>
	<header class="header">
		<nav class="navbar navbar-default">
			<div class="container centered">
				<div class="navbar-header">
					<router-link to="/" class="navbar-brand">Restaurant</router-link>
				</div>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<router-link to="/login" activeClass="active" tag="li" v-if="!isLoggedIn"><a class="navbar-nav__link">Sign in</a></router-link>
						<router-link to="/register" activeClass="active" tag="li" v-if="!isLoggedIn"><a class="navbar-nav__link">Sign up</a></router-link>
						<router-link to="/our-story" activeClass="active" tag="li"><a class="navbar-nav__link">Our Story</a></router-link>
						<router-link to="/recipes" activeClass="active" tag="li"><a class="navbar-nav__link">Recipes</a></router-link>
						<router-link to="/menu" activeClass="active" tag="li"><a class="navbar-nav__link">Menu</a></router-link>
						<router-link to="/add-post" activeClass="active" tag="li"><a class="navbar-nav__link">Add Post</a></router-link>
						<router-link to="/posts" activeClass="active" tag="li"><a class="navbar-nav__link">Posts</a></router-link>
					</ul>
				</div>
				<div class="logout-wrapper">
					<div v-if="isLoggedIn" class="logout" activeClass="active">
						<div v-if="user" class="logout__user"> {{ user }}</div>
						<a @click="logout" class="logout__link">Logout</a>
					</div>
				</div>
			</div>
		</nav>
	</header>
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