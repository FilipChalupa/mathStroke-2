import { BasicTask } from '../utilities/LevelTimeline'
import { ClientPlay } from './clients'
import { SpecificLevelTask } from './levelTask'

export const createBasicLevelTask: SpecificLevelTask<BasicTask> = ({
	log,
	id,
	clients,
	speedMultiplier,
	onDamageHit,
	onFinished,
	event,
	getRelevantTask,
}) => {
	const position = Math.random()
	const timeToImpactMilliseconds = Math.round(5000 / speedMultiplier)

	const task = getRelevantTask(event.tags)

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
		hit,
		canBeSolvedBy,
		destroy,
	}
}
