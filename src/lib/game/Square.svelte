<script lang="ts">
	import type { Image } from '$lib/types';

	type Props = {
		pokemon: Image;
		selected: boolean;
		onclick: () => void;
		found: boolean;
	};

	let { pokemon, selected, onclick, found }: Props = $props();
</script>

<!-- Probably better replace with cn for readability -->
<div
	class={`h-full w-full rounded-md backdrop-blur-2xl transition-transform duration-300 ease-in-out transform-3d 
	${selected ? 'rotate-y-180 border-2 border-violet-400 ' : found ? 'pointer-events-none backdrop-blur-none' : 'border-2 border-violet-400'}`}
>
	<button class="h-full w-full cursor-pointer rounded-md p-4" {onclick}>
		{#if !found && pokemon}
			<img
				src={pokemon.src}
				alt={pokemon.name}
				class={`flex h-full w-full items-center justify-center transition-transform duration-300 ease-in-out backface-hidden ${selected ? '-scale-x-100 rotate-y-0' : 'rotate-y-180'}`}
			/>
		{/if}
	</button>
</div>
