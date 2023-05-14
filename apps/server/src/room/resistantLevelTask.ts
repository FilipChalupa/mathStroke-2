import { ResistantTask } from '../utilities/LevelTimeline'
import { ClientPlay } from './clients'
import { SpecificLevelTask } from './levelTask'

export const createResistantLevelTask: SpecificLevelTask<ResistantTask> =
	(event) =>
	({
		log,
		id,
		clients,
		speedMultiplier,
		onDamageHit,
		onFinished,
		getRelevantTask,
	}) => {
		const initialStrength = 5
		let strength = initialStrength
		const position = Math.random()
		const timeToImpactMilliseconds = Math.round(20000 / speedMultiplier)

		let task = getRelevantTask(event.tags)

		clients.actions.createResistantTask(
			id,
			task.label,
			position,
			timeToImpactMilliseconds,
			strength,
		)

		const impactTimer = setTimeout(() => {
			onDamageHit(5)
			strength = 0
			clients.actions.hitResistantTask(id, task.label, null)
			onFinished()
		}, timeToImpactMilliseconds)

		const hit = (byClient: ClientPlay) => {
			strength--
			if (strength > 0) {
				task = getRelevantTask(event.tags)
			}
			clients.actions.hitResistantTask(id, task.label, byClient.client.getId())
			if (strength <= 0) {
				clearTimeout(impactTimer)
				onFinished()
			}
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
