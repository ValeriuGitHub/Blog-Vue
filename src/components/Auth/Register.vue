<template lang="pug">
	div.container.container-centred
		div.card
			header.card-header
				h4.card-title.mt-2 Sign up
				router-link(to="/login" tag="div")
					a.sign-link.sign-link_white
						button.signup-btn Log in
			article.card-body
				form(@submit.prevent="register")
					div.form-row
						div(:class="{'reg-invalid': $v.name.$error}").col.form-group.input
							label User name
							input(
								type="text"
								class="form-control"
								@blur = "$v.name.$touch()"
								v-model="name")
							p(v-if="!$v.name.minLength").register-wrong
								| User name shoud have at least {{ $v.name.$params.minLength.min }} character.
							p(v-if="!$v.name.maxLength").register-wrong
								| User name musn't have more than {{ $v.name.$params.maxLength.max }} character.
					div(:class="{'reg-invalid': $v.email.$error}").form-group.input
						label Email address
						input(
							type="email"
							class="form-control"
							@blur = "$v.email.$touch()"
							v-model="email")
						p(v-if="!$v.email.email").register-wrong Please provide a valid email address.
					div(:class="{'reg-invalid': $v.password.$error}").form-group.input
						label(for="password") Create Password
						input(
							type="password"
							id="password"
							class="form-control"
							@blur="$v.password.$touch()"
							v-model="password")
						p(v-if="!$v.password.minLength").register-wrong
							| Password shoud have at least {{ $v.password.$params.minLength.min }} character.
						p(v-if="!$v.password.maxLength").register-wrong
							| Password can't have more than {{ $v.password.$params.maxLength.max }} character.
					div(:class="{'reg-invalid': $v.confirmPassword.$error}").form-group.input
						label(for="password-confirm") Confirm Password
						input(
							type="password"
							id="password-confirm"
							class="form-control"
							@blur = "$v.confirmPassword.$touch()"
							v-model="confirmPassword")
						p(v-if="!$v.confirmPassword.sameAs").register-wrong
							| Confirm password must match a password</p>
						div.form-group
							button(type="submit" :disabled="$v.$invalid").btn.btn-primary.btn-block Register
			div.border-top.card-body.text-center
				span.link-margin Have an account?
				router-link(to="/login" class="signup-link" activeClass="active" tag="a") Log in
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

@import '../.././scss/variables.scss';

.input {
	width: 300px;
}
.register {
	&-wrong {
		margin: 7px 0px -10px 0px;
	}
}
.reg-invalid input {
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
		color: $orange;
		text-decoration: none;
		&:hover, &:focus {
			text-decoration: none;
			color: #f6d9d9;
		}
	}
	&-btn {
		background-color: transparent;
		border: 1px solid #fff;
		padding: 10px 15px;
		margin: 0;
		text-decoration: none;
		&:hover {
			color: blue;
			text-decoration: none;
			background-color: #fff;
		}
		&:hover .sign-link {
			color: blue;
			text-decoration: none;
			font-weight: bold;
		}
	}
}

</style>