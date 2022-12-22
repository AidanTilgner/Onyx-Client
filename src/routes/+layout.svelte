<script>
	import Chat from "$lib/components/chat/Chat.svelte";
	import NavButtons from "$lib/components/navigation/NavButtons.svelte";
	import { checkAuthAndRedirect } from "$lib/helpers/auth";
	import { onMount } from "svelte";

	let loggedIn = false;
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
		<NavButtons />
	{/if}
	<slot />
</div>

<style lang="scss">
	@import "$lib/styles/global.scss";
</style>
