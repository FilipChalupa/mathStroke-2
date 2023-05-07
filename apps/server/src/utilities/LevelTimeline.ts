import { Difficulty } from '../room/difficulties'
import { Tag } from '../room/tags'

type BasicTasks = {
	type: 'basic'
	tags: Tag[]
	difficulty: Difficulty
}

type CrumbleTask = {
	type: 'crumble'
}

type ResistantTask = {
	type: 'resistant'
}

type Nothing = {
	type: 'nothing'
}

export type TaskLevelEvent = BasicTasks | CrumbleTask | ResistantTask

export type LevelEvent = (TaskLevelEvent | Nothing) & {
	durationMilliseconds: number
}

export type LevelTimeline = LevelEvent[]
