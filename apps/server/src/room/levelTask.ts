import { TaskLevelEvent } from '../utilities/LevelTimeline'
import { ClientPlay, createClients } from './clients'
import { listTasks } from './tasks'

export type LevelTask = ReturnType<typeof createLevelTask>

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

	const position = Math.random()
	const timeToImpactMilliseconds = Math.round(5000 / speedMultiplier)

	const { task } = (() => {
		const [firstTask, ...relevantTasks] = listTasks([
			'addition' /* @TODO: respect event tags */,
		]).sort(() => 0.5 - Math.random())

		for (const relevantTask of relevantTasks) {
			if (isUniqueSolution(relevantTask.task.solution)) {
				return relevantTask
			}
		}
		return firstTask
	})()

	clients.actions.createBasicTask(
		id,
		task.label,
		position,
		timeToImpactMilliseconds,
	)

	const impactTimer = setTimeout(() => {
		onDamageHit(1)
		clients.actions.destroyBasicTask(id, null)
		onFinished()
	}, timeToImpactMilliseconds)

	const hit = (byClient: ClientPlay) => {
		clearTimeout(impactTimer)
		clients.actions.destroyBasicTask(id, byClient.client.getId())
		onFinished()
	}

	const canBeSolvedBy = (solution: string) => {
		return solution === task.solution
	}

	const destroy = () => {
		clearTimeout(impactTimer)
	}

	return {
		destroy,
		canBeSolvedBy,
		hit,
	}
}
