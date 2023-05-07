import { LevelEvent } from '../utilities/LevelTimeline'
import { levels } from './levels'
import { createLevelTasks } from './levelTasks'

export type Level = ReturnType<typeof createLevel>

const tickFrequencyMilliseconds = 100

export const createLevel = (
	log: (message: string) => void,
	levelNumber: number,
	onFinished: (byWin: boolean) => void,
) => {
	const level = levels[(levelNumber - 1) % levels.length]
	const speedMultiplier = 1 + Math.floor((levelNumber - 1) / levels.length)
	const playerCountMultiplier = 1 // @TODO
	let shield = 3 // @TODO
	let loopTimeout: NodeJS.Timeout
	let timeMilliseconds = 0
	const tasks = createLevelTasks(log, (shieldDamage) => {
		shield = Math.max(0, shield - shieldDamage)
		log(`Hit by damage ${shieldDamage}. Shield is now ${shield}.`)
		if (shield === 0) {
			onFinished(false)
		}
	})

	const startTimelineEvent = (event: LevelEvent) => {
		if (event.type === 'nothing') {
			return
		}
		tasks.startEvent(event, speedMultiplier, playerCountMultiplier)
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
				startTimelineEvent(event)
			}
		})
		timeMilliseconds = newTimeMilliseconds

		if (timeMilliseconds < timelineTime) {
			loopTimeout = setTimeout(loop, tickFrequencyMilliseconds)
		} else {
			log('All events started')
			tasks.taskCountListener.addListener(checkAllTasksSolved)
			checkAllTasksSolved()
		}
	}
	loop()

	const checkAllTasksSolved = () => {
		if (tasks.getRemainingTaskCount() === 0) {
			log('All tasks solved')
			onFinished(true)
		}
	}

	const destroy = () => {
		clearTimeout(loopTimeout)
		tasks.destroy()
		tasks.taskCountListener.removeListener(checkAllTasksSolved)
	}

	return {
		destroy,
	}
}
