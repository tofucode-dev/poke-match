<script lang="ts">
	export const prerender = false;
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}
