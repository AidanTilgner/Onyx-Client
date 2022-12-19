<script lang="ts">
	export let data: { [key: string]: any } = {};
	import { onMount } from "svelte";
	import { loginUser, checkAuth } from "$lib/helpers/auth";
	import OnyxLogo from "$lib/assets/OnyxLogo.svelte";

	const formState = {
		username: "",
		password: ""
	};

	$: console.log("Data: ", data);

	let isTablet = false;

	onMount(async () => {
		const auth = await checkAuth();
		if (auth) {
			window.location.href = "/";
		}
		isTablet = window.innerWidth >= 768;
	});

	const handleSubmit = async () => {
		const { username, password } = formState;
		const loggedIn = await loginUser(username, password);
		if (loggedIn) {
			window.location.href = "/";
		}
	};
</script>

<main>
	<div class="login-modal">
		<div class="login-modal-content">
			<div class="login-modal-header">
				<OnyxLogo height={isTablet ? 110 : 74} width={isTablet ? 110 : 74} />
				<h2>Onyx</h2>
			</div>
			<div class="login-modal-body">
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-group">
						<label for="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							bind:value={formState.username}
							placeholder="Your username..."
						/>
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							bind:value={formState.password}
							placeholder="Your password..."
						/>
					</div>
					<div class="form-group">
						<button type="submit" class="submit-button">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	@use "$lib/styles/mixins" as *;
	@use "$lib/styles/variables" as *;

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f8f8f8;
	}

	.login-modal {
		width: 90vw;
		box-shadow: 0.2px 0.2px 36px 0 rgba($color: #000000, $alpha: 0.15);
		background-color: white;
		// border-radius: 10px;

		@include tablet {
			width: 50vw;
		}

		&-header {
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 300;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			text-align: center;
			margin-top: 36px;

			@include tablet {
				margin-top: 48px;
			}

			h2 {
				font-weight: 400;
				margin: 0;
				font-size: 36px;
				text-align: center;
				padding: 24px 0;
				color: #324373;

				@include tablet {
					font-size: 48px;
				}
			}
		}

		&-body {
			padding: 36px 14px 36px 14px;
			font-weight: 300;
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 24px;

		label {
			font-weight: 400;
			font-size: 22px;
			margin-bottom: 14px;
		}

		input {
			width: 100%;
			padding: 14px 24px;
			border: 1px solid #32437360;
			font-size: 14px;
			box-sizing: border-box;
			transition: all 0.2s ease-in-out;
			border-radius: 2px;
			font-family: "Quicksand", sans-serif;

			&:focus {
				outline: none;
				border: 1px solid $cool-blue;
			}
		}
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.submit-button {
		border: none;
		background-color: #324373;
		color: white;
		padding: 12px 30px;
		box-shadow: 2px 2px 18px 0 rgba($color: #000000, $alpha: 0.25);
		cursor: pointer;
		font-size: 15px;
		font-family: "Quicksand", sans-serif;
		transition: all 0.2s ease-in-out;
		font-weight: 500;
		border-radius: 10px;
		margin: 0;
		margin-left: auto;
		margin-top: 14px;

		&:hover {
			box-shadow: 2px 2px 18px 0 rgba($color: #000000, $alpha: 0.5);
		}

		&:active {
			box-shadow: 2px 2px 18px 0 rgba($color: #000000, $alpha: 0.75);
			transform: translateY(2px);
		}
	}
</style>
