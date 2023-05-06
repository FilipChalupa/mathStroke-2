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

type LevelEvent = (BasicTasks | CrumbleTask | ResistantTask | Nothing) & {
	durationMilliseconds: number
}

export type LevelTimeline = LevelEvent[]
