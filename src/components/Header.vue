<template>
	<nav class="navbar navbar-default">
		<div class="container centered">
			<div class="navbar-header">
				<router-link to="/" class="navbar-brand">Home</router-link>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<router-link to="/login" activeClass="active" tag="li"><a>Sign in</a></router-link>
					<router-link to="/register" activeClass="active" tag="li"><a>Sign up</a></router-link>
					<router-link to="/add-post" activeClass="active" tag="li"><a>Add Post</a></router-link>
					<router-link to="/posts" activeClass="active" tag="li"><a>Posts</a></router-link>
				</ul>
			</div>
			<div class="logout-wrapper">
				<div v-if="isLoggedIn" class="logout" activeClass="active">
					<a @click="logout" class="logout-link">Logout</a>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>

	export default {
		computed : {
      isLoggedIn: function(){ return this.$store.getters.isLoggedIn}
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

@import '.././scss/index.scss';

.logout {
	&-wrapper {
    margin-left: auto;
	}
	&-link {
		position: relative;
    display: block;
    padding: 15px;
    cursor: pointer;
    line-height: 20px;
		color: #fff;
    font-size: 16px;
		&:hover {
			opacity: 0.7;
			text-decoration: none;
		}
	}
}
.navbar {
	display: flex;
	justify-content: center;
	&-default {
		background-color: #ff6f61;
		border-radius: 0px;
		border-color: #ff6f61;
		& {
			.navbar {
				&-brand {
					color: #fff;
				}
				&-nav {
					& .active > a {
						background-color: $orange;
						color: #fff;
						&:focus, &:hover {
							color: #fff;
							background-color: $orange;
						}
					}
					& > li > a {
						color: #fff;
					}
				}
			}
		}
	}
}

</style>