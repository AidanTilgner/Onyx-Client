<script lang="ts">
	import { checkAuth, checkAuthAndRedirect } from "$lib/helpers/auth";
	import { onMount } from "svelte";

	onMount(async () => {
		checkAuthAndRedirect(false, "/login");
	});
</script>

<main>
	<p>
		More coming soon to Onyx Client. See <a
			href="https://github.com/Onyx-Systems/Onyx-Client/issues">issue list</a
		> for more details.
	</p>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	p {
		text-align: center;
	}
</style>
