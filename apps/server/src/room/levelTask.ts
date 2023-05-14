import { assertNever } from 'utilities'
import { TaskLevelEvent } from '../utilities/LevelTimeline'
import { createBasicLevelTask } from './basicLevelTask'
import { ClientPlay, createClients } from './clients'
import { createCrumbleLevelTask } from './crumbleLevelTask'
import { createResistantLevelTask } from './resistantLevelTask'
import { Tag } from './tags'
import { Task, listTasks } from './tasks'

export type LevelTask = ReturnType<typeof createLevelTask>

export type SpecificLevelTask<Event extends TaskLevelEvent> = (
	event: Event,
) => (options: {
	log: (message: string) => void
	id: string
	clients: ReturnType<typeof createClients>
	speedMultiplier: number
	playerCountMultiplier: number
	onDamageHit: (shieldDamage: number) => void
	onFinished: () => void
	getRelevantTask: (tags: Tag[]) => Task
}) => {
	destroy: () => void
	canBeSolvedBy: (solution: string) => boolean
	hit: (byClient: ClientPlay) => void
}

let lastTaskId = 0

export const createLevelTask = (
	log: (message: string) => void,
	clients: ReturnType<typeof createClients>,
	event: TaskLevelEvent,
	speedMultiplier: number,
	playerCountMultiplier: number,
	onDamageHit: (shieldDamage: number) => void,
	onFinished: () => void,
	isUniqueSolution: (solution: string) => boolean,
) => {
	// @TODO: respect event.type and don't pretend all is basic
	const id = `${++lastTaskId}`

	const getRelevantTask = (tags: Tag[]) => {
		const { task } = (() => {
			const [firstTask, ...relevantTasks] = listTasks(tags).sort(
				() => 0.5 - Math.random(),
			)

			for (const relevantTask of relevantTasks) {
				if (isUniqueSolution(relevantTask.task.solution)) {
					return relevantTask
				}
			}
			return firstTask
		})()
		return task
	}

	const createSpecificTask =
		event.type === 'basic'
			? createBasicLevelTask(event)
			: event.type === 'resistant'
			? createResistantLevelTask(event)
			: event.type === 'crumble'
			? createCrumbleLevelTask(event)
			: assertNever(event)

	const { destroy, canBeSolvedBy, hit } = createSpecificTask({
		id,
		log,
		clients,
		speedMultiplier,
		playerCountMultiplier,
		onDamageHit,
		onFinished,
		getRelevantTask,
	})

	return {
		destroy,
		canBeSolvedBy,
		hit,
	}
}
