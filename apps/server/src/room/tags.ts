export type Tag = keyof typeof tags

export const tags = {
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
