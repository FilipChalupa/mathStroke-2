import { Tag } from './tags'

export type Task = {
	label: string
	solution: string
}

export type TaggedTask = {
	task: Task
	tags: Tag[]
}

type TaggetTaskWithoutSolution = Omit<TaggedTask, 'task'> & {
	task: Omit<Task, 'solution'>
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
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 4`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 5`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 6`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 7`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 8`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 4`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 5`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 6`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 7`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 4`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 5`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 6`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 4`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 5`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `5 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `5 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `5 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `5 ${additionSymbol} 4`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `6 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `6 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `6 ${additionSymbol} 3`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `7 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `7 ${additionSymbol} 2`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `8 ${additionSymbol} 1`,
			},
			tags: ['easy'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 1`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 2`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 3`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 4`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 5`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 6`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 7`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 8`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `0 ${additionSymbol} 9`,
			},
			tags: ['simple'],
		},

		{
			task: {
				label: `0 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `1 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `2 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `3 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `4 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `5 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `6 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `7 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `8 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
		{
			task: {
				label: `9 ${additionSymbol} 0`,
			},
			tags: ['simple'],
		},
	] satisfies TaggetTaskWithoutSolution[]
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

export const listTasks = (tags: Tag[]) =>
	tasks.filter((task) => tags.every((tag) => task.tags.includes(tag)))
