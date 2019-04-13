<template>
	<div>
		<app-header></app-header>
		<div>
			<transition name="slide" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import Header from './components/Header/Header.vue';
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

<style lang="scss">

@import './scss/variables.scss';

.container-centred {
  height: calc(100vh - 50px);
	display: flex;
	align-items: center;
}
.title {
	font-size: 56px;
	font-family: "ForeverBrushScript";
	&:after {
	  content: "";
	  height: 2px;
	  width: 110px;
		margin: 13px auto 0px;
	  display: block;
	  background-color: #c8235d;
	}
	&_after {
		&-white {
			&:after {
				background-color: #fff;
			}
		}
	}
}
.text {
	font-size: 18px;
	font-family: "ProximaNova";
	line-height: 1.5;
	letter-spacing: 0.5px;
	font-weight: 500;
	margin: 0 auto;
	width: 520px;
	text-align: center;
}
.centered {
	display: flex;
}
.sign-link {
	text-decoration: none;
	color: $orange;
	&:hover {
		text-decoration: none;
	}
	&_white {
		color: #fff;
		&:hover {
			text-decoration: none;
		}
	}
	&:hover, &:focus {
		text-decoration: none;
		opacity: 0.9;
	}
}
.slide {
	&-enter {
		&-active {
			animation: slide-in 300ms ease-out forwards;
		}
	}
}
.slide {
	&-leave {
		&-active {
			animation: slide-out 300ms ease-out forwards;
		}
	}
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

