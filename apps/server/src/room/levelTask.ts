import { TaskLevelEvent } from '../utilities/LevelTimeline'
import { ClientPlay } from './clients'

export type LevelTask = ReturnType<typeof createLevelTask>

export const createLevelTask = (
	event: TaskLevelEvent,
	speedMultiplier: number,
	playerCountMultiplier: number,
	onDamageHit: (shieldDamage: number) => void,
	onFinished: () => void,
) => {
	// @TODO: change to something more meaningful
	const timer = setTimeout(() => {
		if (Math.random() < 0.5) {
			onDamageHit(Math.random() < 0.5 ? 1 : 2)
		}
	}, 500)

	const hit = (byClient: ClientPlay) => {
		// @TODO
		onFinished()
	}

	const canBeSolvedBy = (solution: string) => {
		// @TODO
		return solution === '42'
	}

	const destroy = () => {
		clearTimeout(timer)
	}

	return {
		destroy,
		canBeSolvedBy,
		hit,
	}
}
