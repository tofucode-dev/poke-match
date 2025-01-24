export interface Level {
	label: string;
	size: number;
	duration: number;
}

export const levels: Level[] = [
	{
		label: 'Easy',
		size: 4,
		duration: 20 * 1000,
	},
	{
		label: 'Medium',
		size: 6,
		duration: 15,
	},
	{
		label: 'Hard',
		size: 8,
		duration: 20,
	}
];
