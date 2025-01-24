import type { Image } from '$lib/types';

export function shuffle<T>(array: T[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const getPokemonsImageArray = (): Image[] => {
	const pokemonImages = import.meta.glob('$lib/assets/pokemons/*.{png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});

	return Object.keys(pokemonImages).map((path) => ({
		src: path.replace('/src/lib/assets/pokemons/', 'src/lib/assets/pokemons/'),
		name: path.replace('/src/lib/assets/pokemons/', '').replace('.png', '').replace('.webp', '')
	}));
};
