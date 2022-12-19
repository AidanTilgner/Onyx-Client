<script>
	import Chat from "$lib/components/chat/Chat.svelte";
</script>

<svelte:head />
<main>
	<Chat />
	<slot />
</main>

<style lang="scss">
	body {
		font-family: "Quicksand", sans-serif;
	}

	* {
		font-family: "Quicksand", sans-serif;
	}
</style>
