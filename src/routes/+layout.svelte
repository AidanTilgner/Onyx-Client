<script>
	import Chat from "$lib/components/chat/Chat.svelte";
</script>

<svelte:head />
<div>
	<Chat />
	<slot />
</div>

<style lang="scss">
	body {
		font-family: "Quicksand", sans-serif;
	}

	* {
		font-family: "Quicksand", sans-serif;
	}
</style>
