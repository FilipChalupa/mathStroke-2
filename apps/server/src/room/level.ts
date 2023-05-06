import { LevelEvent } from '../utilities/LevelTimeline'
import { levels } from './levels'

export type Level = ReturnType<typeof createLevel>

const tickFrequencyMilliseconds = 100

export const createLevel = (
	log: (message: string) => void,
	levelNumber: number,
	onFinished: (byWin: boolean) => void,
) => {
	const level = levels[(levelNumber - 1) % levels.length]
	const speedMultiplier = 1 + Math.floor((levelNumber - 1) / levels.length)
	let loopTimeout: NodeJS.Timeout
	let timeMilliseconds = 0

	const runEvent = (event: LevelEvent) => {
		log(`Starting event ${event.type}`)
	}

	const loop = () => {
		const newTimeMilliseconds =
			timeMilliseconds + tickFrequencyMilliseconds * speedMultiplier
		let timelineTime = 0
		level.timeline.forEach((event) => {
			const isNewlyDiscovered =
				timelineTime >= timeMilliseconds && timelineTime < newTimeMilliseconds
			timelineTime += event.durationMilliseconds
			if (isNewlyDiscovered) {
				runEvent(event)
			}
		})
		timeMilliseconds = newTimeMilliseconds

		if (timeMilliseconds < timelineTime) {
			loopTimeout = setTimeout(loop, tickFrequencyMilliseconds)
		} else {
			log('All events started')

			// @TODO: detect all solved
			onFinished(Math.random() > 0.1)
		}
	}
	loop()

	// @TODO: detect all solved

	const destroy = () => {
		clearTimeout(loopTimeout)
	}

	return {
		destroy,
	}
}
