import { LevelTimeline } from '../utilities/LevelTimeline'
export type Level = {
	name: string
	timeline: LevelTimeline
}

export const levels: Level[] = [
	{
		name: 'Level 1',
		timeline: [
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 2000,
			},
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 1000,
			},
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 5000,
			},
			{
				type: 'basic',
				tags: ['simple', 'addition'],
				durationMilliseconds: 500,
			},
			{
				type: 'resistant',
				strength: 5,
				tags: ['easy', 'addition'],
				durationMilliseconds: 5000,
			},
		],
	},
	{
		name: 'Level 2',
		timeline: [
			{
				type: 'resistant',
				strength: 10,
				tags: ['easy', 'addition'],
				durationMilliseconds: 5000,
			},
		],
	},
	{
		name: 'Level 3',
		timeline: [
			// {
			// 	type: 'crumble',
			// 	tags: ['easy', 'addition'],
			// 	durationMilliseconds: 5000,
			// },
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 2000,
			},
		],
	},
]
