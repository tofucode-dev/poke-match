<script lang="ts">
	import { PauseCircle } from 'lucide-svelte';

	type Props = {
		remaining: number;
		duration: number;
	};
	let { remaining, duration }: Props = $props();
</script>

<div class="flex w-full items-center justify-center gap-2 px-4">
	<button class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-500">
		<PauseCircle class="h-full w-full fill-green-500" />
	</button>
	<div class="relative flex h-4 w-full rounded-full bg-slate-500">
		<div
			class="absolute flex h-4 items-center justify-center rounded-full bg-yellow-500"
			style="width: {(remaining / duration) * 100}%"
		></div>
		<div class="w-full text-center text-xs text-slate-500 mix-blend-difference">
			{Math.round(remaining / 1000)}/{Math.round(duration / 1000)}s
		</div>
	</div>
</div>
