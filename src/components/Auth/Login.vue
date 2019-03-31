<template>
	<div class="container container-centred">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
				<form class="login" @submit.prevent="login">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-envelope"></i></span>
						</div>
						<input
							type="email"
							required
							placeholder="email"
							class="form-control"
							v-model="email">
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input
							type="password"
							required
							class="form-control"
							placeholder="password"
							v-model="password">
					</div>
					<div class="form-group">
						<button type="submit" class="btn float-right login_btn">Login</button>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="links">
					Don't have an account?<router-link to="/register" activeClass="active" class="signup-link" tag="a">Sign up</router-link>
				</div>
				<ul class="social_icon">
					<li>
						<a href="https://www.facebook.com/">
							<i class="fab fa-facebook-square social-icon"></i>
						</a>
					</li>
					<li>
						<a href="https://plus.google.com/">
							<i class="fab fa-google-plus-square social-icon"></i>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com/">
							<i class="fab fa-twitter-square social-icon"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				email : "",
				password : ""
			}
		},
		methods: {
			login: function () {
				let email = this.email;
				let password = this.password;
				this.$store.dispatch('login', { email, password })
			 .then(() => this.$router.push('/posts'))
			 .catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="scss">

@import '../.././scss/index.scss';
@import "../../.././node_modules/@fortawesome/fontawesome-free/css/all.css";

.card {
	width: 400px;
	padding: 30px 15px;
	margin: 20px 20px;
	text-align: center;
	margin: 0px auto 0px;
	background-color: rgba(0,0,0,0.5);
	&-header {
		color: white;
		margin-bottom: 20px;
	}
	&-body {
		display: flex;
		justify-content: center;
	}
}
.social_icon {
	@extend %list;
	display: flex;
	justify-content: center;
	margin-top: 20px;
	& i {
		font-size: 40px;
		margin-left: 10px;
		color: $orange;
		&:hover {
			color: white;
			cursor: pointer;
		}
	}
}
.input-group {
	display: flex;
	&-prepend span {
		width: 30px;
		padding: 10.5px 0px;
		background-color: $orange;
		color: black;
		display: flex;
		justify-content: center;
		align-content: center;
		border: 0;
	}
}
.remember{
	color: white;
	& input {
		width: 20px;
		height: 20px;
		margin-left: 15px;
		margin-right: 5px;
	}
}
.login_btn {
	color: black;
	background-color: $orange;
	width: 100px;
	padding: 7.6px 12px;
	&_big {
		padding: 7.6px 44px;
		font-weight: bold;
		width: auto;
	}
	&:hover {
		color: black;
		background-color: white;
	}
}
.links{
	color: white;
	& a {
		margin-left: 4px;
	}
}

</style>