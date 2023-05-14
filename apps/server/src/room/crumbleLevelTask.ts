import { CrumbleTask } from '../utilities/LevelTimeline'
import { ClientPlay } from './clients'
import { SpecificLevelTask } from './levelTask'

export const createCrumbleLevelTask: SpecificLevelTask<CrumbleTask> =
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
		// @TODO: Implement this

		const timeToImpactMilliseconds = Math.round(1000 / speedMultiplier)

		const impactTimer = setTimeout(() => {
			onDamageHit(10)
			onFinished()
		}, timeToImpactMilliseconds)

		const hit = (byClient: ClientPlay) => {}

		const canBeSolvedBy = (solution: string) => {
			return false
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
