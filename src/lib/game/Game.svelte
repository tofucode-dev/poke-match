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
	let pokemons: Image[] = $state([]);
	let grid: Image[] = $state([]);

	let size: number = $state(level.size);
	let found: Image[] = $state([]);
	let remaining: number = $state(level.duration);
	let duration: number = $state(level.duration);
	let playing: boolean = $state(true);

	onMount(() => {
		pokemons = getPokemonsImageArray();
		grid = createGrid(level);
	});

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

<div class="text relative flex h-full flex-col items-center justify-center bg-blue-400 p-10">
	<div
		class="absolute h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat"
	></div>
	<div class="absolute container mx-auto max-w-[650px]">
		<div
			class="mb-2 flex h-24 w-full items-center justify-center rounded-2xl border-2 border-violet-400 text-white backdrop-blur-2xl"
		>
			<Countdown {remaining} {duration} />
		</div>
		<Grid {grid} {onFound} {found} />
		<div
			class="justify-cente mt-2 flex h-24 w-full items-center rounded-2xl border-2 border-violet-400 text-white backdrop-blur-2xl"
		>
			<Found {found} />
		</div>
	</div>
</div>
