<template lang="pug">
	div.container.container-centred
		div.card
			div.card-header
				h3.card-header__title Sign In
			div.card-body
				form(@submit.prevent="login").login
					div(:class="{invalid: $v.email.$error}").input-group.form-group.input
						div.input-group-prepend
							span.input-group-text
								i.fas.fa-envelope
						input(
							type="email"
							required
							placeholder="email"
							class="form-control"
							@blur = "$v.email.$touch()"
							v-model="email")
					p(v-if="!$v.email.email").email_wrong Please provide a valid email address.
					div(:class="{invalid: $v.password.$error}").input-group.form-group.input
						div.input-group-prepend
							span.input-group-text
								i.fas.fa-key
						input(
							type="password"
							required
							class="form-control password"
							placeholder="password"
							@blur = "$v.password.$touch()"
							v-model="password")
					p(v-if="!$v.password.minLength").password_wrong
						| Password shoud have at least {{ $v.password.$params.minLength.min }} character
					p(v-if="!$v.password.maxLength").password_wrong
						| Password can't have more than {{ $v.password.$params.maxLength.max }} character.
					div.form-group
						button(type="submit" :disabled="$v.$invalid").btn.float-right.login_btn Login
			div.card-footer
				div.links
					| Don't have an account?<router-link to="/register" activeClass="active" class="signup-link links__login" tag="a">Sign up</router-link>
			p(v-if="status").login-wrong {{ status }}
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

.invalid {
	border: 1px solid red;
	background-color: #ffc9aa;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	& label {
		color: red;
	}
}
.login-wrong {
	color: red;
	margin: 10px 0px 0px;
	padding: 10px;
	font-size: 18px;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid red;
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
.email {
	&_wrong {
		margin: -10px 0px 4px;
	}
}
.password {
	&_wrong {
		margin: -10px 0px 10px;
	}
}
.input-group {
	display: flex;
	width: 240px;
	margin: 0 auto 15px;
	&-text {
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
.login_btn {
	color: black;
	background-color: $orange;
	width: 100px;
	padding: 7.6px 16px;
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
	&__login {
		margin-left: 4px;
		color: $orange;
		&:hover {
			text-decoration: none;
			color: #f6d9d9;
		}
	}
}

</style>