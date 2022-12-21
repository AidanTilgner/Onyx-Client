<script>
	import Chat from "$lib/components/chat/Chat.svelte";
	import NavButtons from "$lib/components/navigation/NavButtons.svelte";
</script>

<svelte:head />
<div>
	<Chat />
	<NavButtons />
	<slot />
</div>

<style lang="scss">
	@import "$lib/styles/global.scss";
</style>
