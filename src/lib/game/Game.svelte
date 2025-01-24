<script lang="ts">
	import Found from '$lib/game/Found.svelte';
	import Grid from '$lib/game/Grid.svelte';
	import { onMount } from 'svelte';
	import Countdown from './Countdown.svelte';
	import type { Level } from './levels';
	import { levels } from './levels';
	import { getPokemonsImageArray, shuffle } from './utils';
	import type { Image } from '$lib/types';

	const level = levels[0];

	let pokemons: Image[] = $state(getPokemonsImageArray());
	let size: number = $state(level.size);
	let grid: Image[] = $state(createGrid(level));
	let found: Image[] = $state([]);
	let remaining: number = $state(level.duration);
	let duration: number = $state(level.duration);
	let playing: boolean = $state(true);

	function createGrid(level: Level) {
		const copy = pokemons.slice();
		const pairs: Image[] = [];

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

	//
	function onFound(pokemon: Image) {
		found.push(pokemon);
	}

	// Countdown using requestAnimationFrame
	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (!playing) return;
			requestAnimationFrame(loop);
			remaining = remainingAtStart - (Date.now() - start);
			if (remaining <= 0) {
				//TODO: Game over
				playing = false;
			}
		}

		loop();
	}

	onMount(countdown);
</script>

<div class="text flex h-full flex-col items-center justify-center bg-blue-800 p-10">
	<div class="container mx-auto max-w-[650px]">
		<div class="flex h-24 w-full items-center justify-center bg-green-500 text-white">
			<Countdown {remaining} {duration} />
		</div>
		<Grid {grid} {onFound} {found} />
		<div class="flex h-24 w-full items-center justify-center bg-yellow-500 text-white">
			<Found {found} />
		</div>
	</div>
</div>
