<script lang="ts">
	type Props = {
		pokemon: string;
		selected: boolean;
		onclick: () => void;
		found: boolean;
	};

	let { pokemon, selected, onclick, found }: Props = $props();
</script>

<button
	class={`h-full w-full cursor-pointer rounded-md bg-yellow-500 p-4 active:bg-red-500
    ${selected && 'bg-red-500'}
    `}
	{onclick}
>
	{#if !found}
		<span class="text-clamp flex h-full w-full items-center justify-center">{pokemon}</span>
	{/if}
</button>
