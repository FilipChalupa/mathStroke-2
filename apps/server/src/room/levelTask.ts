import { TaskLevelEvent } from '../utilities/LevelTimeline'
import { ClientPlay, createClients } from './clients'

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
) => {
	// @TODO: respect event.type and don't pretend all is basic
	const id = `${++lastTaskId}`

	const position = Math.random()
	const timeToImpactMilliseconds = 5000
	const solvedBy = '42'

	clients.actions.createBasicTask(
		id,
		'The solution is 42',
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
		return solution === solvedBy
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
