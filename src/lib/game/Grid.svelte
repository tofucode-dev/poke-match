<script lang="ts">
	import Square from '$lib/game/Square.svelte';
	import type { Image } from '$lib/types';

	type Props = {
		onFound: (pokemon: Image) => void;
		grid: Image[];
		found: Image[];
	};
	let a = $state(-1);
	let b = $state(-1);
	let resetTimeout: number | null = $state(null);

	let { grid, onFound, found }: Props = $props();
</script>

<div style="perspective: 100vw" class="grid aspect-square w-full grid-cols-4 grid-rows-4 gap-1">
	{#each grid as pokemon, i}
		{#key i}
			<Square
				{pokemon}
				selected={a === i || b === i}
				found={found.includes(pokemon)}
				onclick={() => {
					if (resetTimeout) {
						clearTimeout(resetTimeout);
						resetTimeout = null;
					}
					if (a === -1 && b === -1) {
						a = i;
					} else if (b === -1) {
						b = i;
						if (grid[a].name === grid[b].name) {
							onFound(pokemon);
						} else {
							resetTimeout = setTimeout(() => {
								a = -1;
								b = -1;
							}, 1000);
						}
					} else {
						b = -1;
						a = i;
					}
				}}
			/>
		{/key}
	{/each}
</div>
