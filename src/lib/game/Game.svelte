<script lang="ts">
	import Found from '$lib/game/Found.svelte';
	import Grid from '$lib/game/Grid.svelte';
	import type { Level } from './levels';
	import { levels } from './levels';
	import { shuffle } from './utils';

	const level = levels[0];

	let size: number = $state(level.size);
	let grid: string[] = $state(createGrid(level));
	let found: string[] = $state([]);

	function createGrid(level: Level) {
		const copy = level.pokemons.slice();
		const pairs: string[] = [];

		//Randomly pick pairs
		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const randomIndex = Math.floor(Math.random() * copy.length);
			pairs.push(copy[randomIndex]);
			//Remove from copy to avoid duplicates
			copy.splice(randomIndex, 1);
		}

		//Duplicate
		pairs.push(...pairs);

		return shuffle(pairs);
	}

	function onFound(pokemon: string) {
		found.push(pokemon);
	}
</script>

<div class="text flex h-full flex-col items-center justify-center bg-blue-800 p-20">
	<div class="container mx-auto max-w-4xl">
		<div class="flex h-24 w-full items-center justify-center bg-green-500 text-white">Info</div>
		<Grid {grid} {onFound} {found} />
		<div class="flex h-24 w-full items-center justify-center bg-yellow-500 text-white">
			<Found {found} />
		</div>
	</div>
</div>
