<script>
	import Chat from "$lib/components/chat/Chat.svelte";
	import NavButtons from "$lib/components/navigation/NavButtons.svelte";
	import Nav from "$lib/components/navigation/Nav.svelte";
	import { checkAuthAndRedirect } from "$lib/helpers/auth";
	import { onMount } from "svelte";

	let loggedIn = true;
	onMount(async () => {
		if (!window.location.href.includes("login")) {
			loggedIn = await checkAuthAndRedirect("/login");
		}
	});
</script>

<svelte:head />
<div>
	{#if loggedIn}
		<Chat />
		<Nav />
	{/if}
	<slot />
</div>

<style lang="scss">
</style>
