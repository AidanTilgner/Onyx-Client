<script lang="ts">
	import { checkAuth } from '$lib/helpers/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		const auth = await checkAuth();
		if (!auth) {
			window.location.href = '/login';
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
