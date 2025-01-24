<script lang="ts">
	import type { Image } from '$lib/types';

	type Props = {
		found: Image[];
	};
	let { found }: Props = $props();
</script>

<div class="flex w-full items-center justify-center gap-1">
	{#each found as pokemon}
		<span class="flex h-14 w-14 flex-wrap items-center justify-center">
			<img src={`${pokemon.src}?url`} alt={pokemon.name} />
		</span>
	{/each}
</div>
