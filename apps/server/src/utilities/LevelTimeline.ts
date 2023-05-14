import { Tag } from '../room/tags'

export type BasicTask = {
	type: 'basic'
	tags: Tag[]
}

export type CrumbleTask = {
	type: 'crumble'
	tags: Tag[]
}

export type ResistantTask = {
	type: 'resistant'
	strength: number
	tags: Tag[]
}

export type Nothing = {
	type: 'nothing'
}

export type TaskLevelEvent = BasicTask | CrumbleTask | ResistantTask

export type LevelEvent = (TaskLevelEvent | Nothing) & {
	durationMilliseconds: number
}

export type LevelTimeline = LevelEvent[]
