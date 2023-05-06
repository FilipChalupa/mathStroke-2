import { Difficulty } from './difficulties'
import { Tag } from './tags'

export type Task = {
	label: string
	solution: string
}

export type TaggedTask = {
	task: Task
	tags: Tag[]
	difficulty: Difficulty
}

const additionSymbol = '+'
const subtractionSymbol = '-'
const multiplicationSymbol = '×'
const divisionSymbol = '÷'

export const tasks: TaggedTask[] = (
	[
		{
			task: {
				label: `1 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 4`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 5`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 6`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 7`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `1 ${additionSymbol} 8`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 4`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 5`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 6`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `2 ${additionSymbol} 7`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 4`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 5`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `3 ${additionSymbol} 6`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `4 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `4 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `4 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `4 ${additionSymbol} 4`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `4 ${additionSymbol} 5`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `5 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `5 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `5 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `5 ${additionSymbol} 4`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `6 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `6 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `6 ${additionSymbol} 3`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `7 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `7 ${additionSymbol} 2`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `8 ${additionSymbol} 1`,
			},
			difficulty: 'easy',
		},
		{
			task: {
				label: `0 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 1`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 2`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 3`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 4`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 5`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 6`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 7`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 8`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `0 ${additionSymbol} 9`,
			},
			difficulty: 'simple',
		},

		{
			task: {
				label: `0 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `1 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `2 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `3 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `4 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `5 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `6 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `7 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `8 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
		{
			task: {
				label: `9 ${additionSymbol} 0`,
			},
			difficulty: 'simple',
		},
	] as const
).map((item) => {
	const tags: Tag[] = []
	if (item.task.label.includes(additionSymbol)) {
		tags.push('addition')
	}
	if (item.task.label.includes(subtractionSymbol)) {
		tags.push('subtraction')
	}
	if (item.task.label.includes(multiplicationSymbol)) {
		tags.push('multiplication')
	}
	if (item.task.label.includes(divisionSymbol)) {
		tags.push('division')
	}
	return {
		...item,
		task: {
			...item.task,
			solution: eval(
				item.task.label
					.replaceAll(additionSymbol, '+')
					.replaceAll(subtractionSymbol, '-')
					.replaceAll(multiplicationSymbol, '*')
					.replaceAll(divisionSymbol, '/'),
			).toString(),
		},
		tags,
	}
})
