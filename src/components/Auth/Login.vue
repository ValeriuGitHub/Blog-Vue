<template>
	<div class="container container-centred">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
				<form class="login" @submit.prevent="login">
					<div class="input-group form-group input" :class="{invalid: $v.email.$error}">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-envelope"></i></span>
						</div>
						<input
							type="email"
							required
							placeholder="email"
							class="form-control"
							@blur = "$v.email.$touch()"
							v-model="email">
					</div>
					<p class="forInvalidInputs" v-if="!$v.email.email">Please provide a valid email address.</p>
					<div class="input-group form-group input" :class="{invalid: $v.password.$error}">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input
							type="password"
							required
							class="form-control"
							placeholder="password"
							@blur = "$v.password.$touch()"
							v-model="password">
					</div>
					<p class="forInvalidPassword" v-if="!$v.password.minLength">
					Password shoud have at least {{ $v.password.$params.minLength.min }} character.</p>
					<p class="forInvalidPassword" v-if="!$v.password.maxLength">
					Password can't have more than {{ $v.password.$params.maxLength.max }} character.</p>
					<div class="form-group">
						<button type="submit" class="btn float-right login_btn" :disabled="$v.$invalid">Login</button>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="links">
					Don't have an account?<router-link to="/register" activeClass="active" class="signup-link" tag="a">Sign up</router-link>
				</div>
			</div>
			<p v-if="status" class="wrongLogin"> {{ status }}</p>
		</div>
	</div>
</template>

<script>
	import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

	export default {
		data(){
			return {
				email : "",
				password : "",
				getin: null
			}
		},
		computed: {
			isLoggedIn: function(){ return this.$store.getters.isLoggedIn },
			status() {
				return this.$store.getters.authStatus
			}
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(8),
				maxLength: maxLength(16)
			}
		},
		methods: {
			login: function () {
				let data = {
					email: this.email,
					password: this.password,
					getin: this.getin
				}
			  this.$store.dispatch('loginRequest', data)
			  .then(() => this.$router.push('/posts'))
			  .catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="scss">

@import '../.././scss/index.scss';
@import "../../.././node_modules/@fortawesome/fontawesome-free/css/all.css";

.input.invalid input {
	border: 1px solid red;
	background-color: #ffc9aa;
}

.wrongLogin {
	color: red;
  margin: 10px 0px 0px;
  padding: 10px;
  font-size: 18px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid darkorange;
}

.input.invalid label {
	color: red;
}

.forInvalidInputs {
  margin: -10px 0px 4px;
}

.forInvalidPassword {
  margin: -10px 0px 14px;
}

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
.input-group {
	display: flex;
	width: 210px;
	margin: 0 auto 15px;
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