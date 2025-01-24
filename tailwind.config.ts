import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	prefix: '--tw-',
	theme: {
		extend: {
			fontSize: {
				clamp: 'clamp(1rem,12vw,6rem)'
			}
		}
	},

	plugins: []
} satisfies Config;
