<script lang="ts">
	import { onMount } from "svelte";

	let currentRoute: string = "";
	onMount(() => {
		currentRoute = window.location.pathname;
	});

	$: includesRoute = (route: string) => {
		return currentRoute.includes(route);
	};

	$: isRoute = (route: string) => {
		return currentRoute === route;
	};
</script>

<div class="nav-buttons">
	<button
		class="nav-button {isRoute('/') && 'active'}"
		on:click={() => {
			window.location.href = "/";
		}}
	>
		<i class="ph-house-light icon" />
	</button>
	<button
		class="nav-button {includesRoute('settings') && 'active'}"
		on:click={() => {
			window.location.href = "/settings";
		}}
	>
		<i class="ph-gear-light icon" />
	</button>
</div>

<style lang="scss">
	@use "$lib/styles/variables.scss" as *;
	@use "$lib/styles/mixins.scss" as *;

	.nav-buttons {
		position: fixed;
		bottom: 108px;
		right: 14px;
		width: 56px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.nav-button {
		border-radius: 50%;
		background-color: rgba($color: $cool-blue, $alpha: 0.9);
		padding: 10px;
		margin-top: 10px;
		width: 36px;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		border: none;
		box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.1);

		&:hover {
			transform: scale(1.1);
		}

		.icon {
			font-size: 18px;
			padding: 0;
			color: white;
		}
	}

	.active {
		// background-color: $cool-blue;
		// border: 1px solid $darker-blue;
		opacity: 0.8;
	}
</style>
