import { Difficulty } from '../room/difficulties'
import { Tag } from '../room/tags'

type BasicTask = {
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

export type TaskLevelEvent = BasicTask | CrumbleTask | ResistantTask

export type LevelEvent = (TaskLevelEvent | Nothing) & {
	durationMilliseconds: number
}

export type LevelTimeline = LevelEvent[]
