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
						<div class="col form-group">
							<label>First name </label>
								<input
									type="text"
									required
									autofocus
									class="form-control"
									placeholder=""
									v-model="name">
						</div>
						<div class="col form-group">
							<label>Last name</label>
								<input type="text" class="form-control" placeholder=" ">
						</div>
					</div>
					<div class="form-group">
						<label>Email address</label>
						<input
							type="email"
							required
							class="form-control"
							placeholder=""
							v-model="email">
						<small class="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div class="form-group gender-group">
						<label class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="gender" value="option1">
							<span class="form-check-label"> Male </span>
						</label>
						<label class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="gender" value="option2">
							<span class="form-check-label"> Female </span>
						</label>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label>City</label>
							<input type="text" class="form-control">
						</div>
						<div class="form-group col-md-6">
							<label>Country</label>
							<select id="inputState" class="form-control">
								<option> Choose...</option>
									<option>Uzbekistan</option>
									<option>Russia</option>
									<option selected="">United States</option>
									<option>India</option>
									<option>Afganistan</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="password">Create Password</label>
							<input
								type="password"
								id="password"
								required
								class="form-control"
								v-model="password">
					</div>
					<div class="form-group">
						<label for="password-confirm">Confirm Password</label>
							<input
								type="password"
								id="password-confirm"
								required
								class="form-control"
								v-model="password_confirmation">
					</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary btn-block">
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
	export default {
		data(){
			return {
				name : "",
				email : "",
				password : "",
				password_confirmation : ""
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