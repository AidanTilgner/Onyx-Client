<script lang="ts">
	// a page that displays a bunch of sections which contain data about the user
	import { onMount } from "svelte";
	import type { UserProfile } from "$lib/declarations/main.d";

	let profile: Partial<UserProfile> = {};

	const submitProfile = async () => {
		const accessToken = localStorage.getItem("access_token");
		const response = await fetch(`/api/profile?token=${accessToken}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(profile)
		});
		const data = await response.json();
		console.log(data);
	};

	onMount(async () => {
		const accessToken = localStorage.getItem("access_token");
		const response = await fetch(`/api/profile?token=${accessToken}`);
		const data = await response.json();
		profile = data.data;
	});

	$: console.log(profile);
</script>

<main>
	<h1 class="title">Settings</h1>
	<hr />
	<section>
		<h2 class="subtitle">Profile</h2>
		<div class="form-group">
			<label for="username">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				placeholder="Username..."
				bind:value={profile.username}
			/>
		</div>
		<div class="form-group">
			<label for="email">Email</label>
			<input
				type="text"
				name="email"
				id="email"
				placeholder="Email..."
				bind:value={profile.email}
			/>
		</div>
		<div class="form-group">
			<label for="first_name">First Name</label>
			<input
				type="text"
				name="first_name"
				id="first_name"
				placeholder="Email..."
				bind:value={profile.first_name}
			/>
		</div>
		<div class="form-group">
			<label for="last_name">Last Name</label>
			<input
				type="text"
				name="last_name"
				id="last_name"
				placeholder="Email..."
				bind:value={profile.last_name}
			/>
		</div>
		<div class="form-buttons">
			<button class="button is-primary" on:click={submitProfile}>Save</button>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		min-height: 120vh;
		padding: 14px 24px;
	}

	section {
	}
</style>
