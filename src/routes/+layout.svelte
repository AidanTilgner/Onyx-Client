<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Quicksand:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<main>
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
