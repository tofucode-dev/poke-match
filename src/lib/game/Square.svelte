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

<div class={`square h-full w-full rounded-md bg-yellow-300`} class:flipped={selected || found}>
	<button class="h-full w-full cursor-pointer rounded-md p-4" {onclick}>
		{#if !found}
			<img
				src={pokemon.src}
				alt={pokemon.name}
				class={`flex h-full w-full items-center justify-center`}
			/>
		{/if}
	</button>
</div>

<style>
	.square {
		transform-style: preserve-3d;
		transition: transform 0.3s ease-in-out;
	}
	.flipped {
		border: 2px solid red;
		transform: rotateY(180deg);
		img {
			transform: rotateY(0deg);
		}
	}

	img {
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: transform 0.3s ease-in-out;
	}
</style>
