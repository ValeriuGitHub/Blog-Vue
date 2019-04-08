<template>
	<div class="container container-centred">
		<div class="card">
			<header class="card-header">
				<h4 class="card-title mt-2">Sign up</h4>
				<button class="signup-btn">
					<router-link to="/login" class="sign-link" activeClass="active" tag="a">
						Log in
					</router-link>
				</button>
			</header>
			<article class="card-body">
				<form @submit.prevent="register">
					<div class="form-row">
						<div class="col form-group input" :class="{invalid: $v.name.$error}">
							<label>User name </label>
								<input
									type="text"
									class="form-control"
									@blur = "$v.name.$touch()"
									v-model="name">
								<p class="forInvalidInputs" v-if="!$v.name.minLength">
								User name shoud have at least {{ $v.name.$params.minLength.min }} character.</p>
								<p class="forInvalidInputs" v-if="!$v.name.maxLength">
								User name musn't have more than {{ $v.name.$params.maxLength.max }} character.</p>
						</div>
					</div>
					<div class="form-group input" :class="{invalid: $v.email.$error}">
						<label>Email address</label>
						<input
							type="email"
							class="form-control"
							@blur = "$v.email.$touch()"
							v-model="email">
						<p class="forInvalidInputs" v-if="!$v.email.email">Please provide a valid email address.</p>
					</div>
					<div class="form-group input" :class="{invalid: $v.password.$error}">
						<label for="password">Create Password</label>
							<input
								type="password"
								id="password"
								class="form-control"
								@blur = "$v.password.$touch()"
								v-model="password">
							<p class="forInvalidInputs" v-if="!$v.password.minLength">
							Password shoud have at least {{ $v.password.$params.minLength.min }} character.</p>
							<p class="forInvalidInputs" v-if="!$v.password.maxLength">
							Password can't have more than {{ $v.password.$params.maxLength.max }} character.</p>
					</div>
					<div class="form-group input" :class="{invalid: $v.confirmPassword.$error}">
						<label for="password-confirm">Confirm Password</label>
							<input
								type="password"
								id="password-confirm"
								class="form-control"
								@blur = "$v.confirmPassword.$touch()"
								v-model="confirmPassword">
						<p class="forInvalidInputs" v-if="!$v.confirmPassword.sameAs">
						Confirm password must match a password</p>
					</div>
						<div class="form-group">
							<button type="submit" :disabled="$v.$invalid" class="btn btn-primary btn-block">
								Register
							</button>
						</div>
				</form>
			</article>
			<div class="border-top card-body text-center">
				<span class="link-margin">Have an account?</span>
				<router-link to="/login" class="signup-link" activeClass="active" tag="a">
					Log in
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

	export default {
		data(){
			return {
				name : "",
				email : "",
				password : "",
				confirmPassword : ""
			}
		},
		validations: {
			email: {
				required,
				email
			},
			name: {
				required,
				minLength: minLength(6),
				maxLength: maxLength(15)
			},
			password: {
				required,
				minLength: minLength(8),
				maxLength: maxLength(16)
			},
			confirmPassword: {
				sameAs: sameAs('password')
			}
		},
		methods: {
			register: function () {
				let data = {
					name: this.name,
					email: this.email,
					password: this.password,
					is_admin: this.is_admin
				}
				this.$store.dispatch('register', data)
				.then(() => this.$router.push('/login'))
				.catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="scss" scoped>

.input.invalid label {
	color: red;
}

.input {
	width: 300px;
}

.forInvalidInputs {
	margin: 10px;
}

.input.invalid input {
	border: 1px solid red;
	background-color: #ffc9aa;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.link-margin {
	margin-right: 5px;
}
.text-muted {
	color: #fff;
}
.form{
	&-check {
		&-inline {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.gender-group {
	display: flex;
	justify-content: center;
}
input[type=radio] {
	margin: 0 5px;
}
.signup {
	&-link {
		text-decoration: none;
		&:hover, &:focus {
			text-decoration: none;
			color: blue;
		}
	}
	&-btn {
		background-color: transparent;
		border: 1px solid blue;
		padding: 10px 15px;
		margin: 0;
		&:hover {
			background-color: #fff;
		}
		&:hover .sign-link {
			color: blue;
			font-weight: bold;
		}
	}
}

</style>