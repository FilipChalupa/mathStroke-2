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
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['simple', 'addition'],
				durationMilliseconds: 10000,
			},
		],
	},
	{
		name: 'Level 2',
		timeline: [
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 5000,
			},
			{
				type: 'basic',
				tags: ['simple', 'addition'],
				durationMilliseconds: 7000,
			},
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 3000,
			},
			{
				type: 'basic',
				tags: ['simple', 'addition'],
				durationMilliseconds: 10000,
			},
		],
	},
	{
		name: 'Level 3',
		timeline: [
			{
				type: 'basic',
				tags: ['easy', 'addition'],
				durationMilliseconds: 1000,
			},
		],
	},
]
