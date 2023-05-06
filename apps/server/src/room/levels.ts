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
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 10000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'simple',
				durationMilliseconds: 10000,
			},
		],
	},
	{
		name: 'Level 2',
		timeline: [
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 5000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'simple',
				durationMilliseconds: 7000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 3000,
			},
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'simple',
				durationMilliseconds: 10000,
			},
		],
	},
	{
		name: 'Level 3',
		timeline: [
			{
				type: 'basic',
				tags: ['addition'],
				difficulty: 'easy',
				durationMilliseconds: 1000,
			},
		],
	},
]
