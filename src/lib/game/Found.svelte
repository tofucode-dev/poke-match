<script lang="ts">
	type Props = {
		found: string[];
	};
	let { found }: Props = $props();
</script>

<div class="flex items-center justify-center gap-1">
	{#each found as pokemon}
		<span class="text-clamp flex h-full w-full items-center justify-center">{pokemon}</span>
	{/each}
</div>
