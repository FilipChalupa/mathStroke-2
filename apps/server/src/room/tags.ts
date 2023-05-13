export type Tag = keyof typeof tags

export const tags = {
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
	addition: {
		label: 'Addition',
	},
	subtraction: {
		label: 'Subtraction',
	},
	multiplication: {
		label: 'Multiplication',
	},
	division: {
		label: 'Division',
	},
} as const satisfies {
	[key: string]: { label: string }
}
