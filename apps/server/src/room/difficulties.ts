export type Difficulty = keyof typeof difficulties

export const difficulties = {
	easy: {
		label: 'Easy',
	},
	simple: {
		label: 'Simple',
	},
	intermediate: {
		label: 'Intermediate',
	},
	advanced: {
		label: 'Advanced',
	},
	hard: {
		label: 'Hard',
	},
} as const satisfies {
	[key: string]: { label: string }
}
