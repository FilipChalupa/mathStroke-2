import { Tag } from '../room/tags'

export type BasicTask = {
	type: 'basic'
	tags: Tag[]
}

export type CrumbleTask = {
	type: 'crumble'
}

export type ResistantTask = {
	type: 'resistant'
}

export type Nothing = {
	type: 'nothing'
}

export type TaskLevelEvent = BasicTask | CrumbleTask | ResistantTask

export type LevelEvent = (TaskLevelEvent | Nothing) & {
	durationMilliseconds: number
}

export type LevelTimeline = LevelEvent[]
