<template>
	<div>
		<app-header></app-header>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<transition name="slide" mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from './components/Header.vue';
	export default {
		created: function () {
			this.$router.push('/posts')
			this.$http.interceptors.response.use(undefined, function (err) {
				return new Promise(function (resolve, reject) {
					if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
						this.$store.dispatch('logout')
						this.$router.push('/login')
					}
					throw err;
				});
			});
		},
		created() {
			this.$store.dispatch('tryAutoLogin')
		},
		components: {
			appHeader: Header
		}
	}
</script>

<style>

	.container-centred {
		height: calc(100vh - 92px);
		display: flex;
		align-items: center;
	}

	.centered {
		display: flex;
		justify-content: start;
	}

	.sign-link {
		text-decoration: none;
		color: aqua;
	}

	.sign-link:hover, .sign-link:focus {
		text-decoration: none;
		opacity: 0.9;
	}

	.signup-link {
		color: aqua;
		text-decoration: none;
	}

	.signup-link:hover, .signup-link:focus {
		text-decoration: none;
		opacity: 0.9;
	}

	.signup-link-btn {
		background-color: transparent;
		border: 1px solid blue;
		padding: 10px 15px;
		margin: 0;
	}

	.signup-link-btn:hover {
		background-color: #fff;
	}

	.slide-enter-active {
		animation: slide-in 300ms ease-out forwards;
	}

	.slide-leave-active {
		animation: slide-out 300ms ease-out forwards;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}

		to {
			opacity: 0;
			transform: translateY(-30px);
		}
	}

</style>

