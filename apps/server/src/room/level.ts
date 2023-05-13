import { LevelEvent } from '../utilities/LevelTimeline'
import { createClients } from './clients'
import { createLevelTasks } from './levelTasks'
import { levels } from './levels'

export type Level = ReturnType<typeof createLevel>

const tickFrequencyMilliseconds = 100

export const createLevel = (
	log: (message: string) => void,
	clients: ReturnType<typeof createClients>,
	levelNumber: number,
	onFinished: (byWin: boolean) => void,
) => {
	// @TODO: use level name
	const { timeline } = levels[(levelNumber - 1) % levels.length] // @TODO: transform into multiple events based on player count
	const speedMultiplier = 1 + Math.floor((levelNumber - 1) / levels.length)
	const playerCountMultiplier = 1 // @TODO
	let shield = 3 // @TODO
	let loopTimeout: NodeJS.Timeout
	let timeMilliseconds = 0
	const tasks = createLevelTasks(log, (shieldDamage) => {
		shield = Math.max(0, shield - shieldDamage)
		log(`Hit by damage ${shieldDamage}. Shield is now ${shield}.`)
		clients.actions.updateShield(shield)
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
		timeline.forEach((event) => {
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

	const handleSolution: Parameters<typeof clients.solution.addListener>[0] = ({
		client,
		solution,
	}) => {
		const solvedTasks = tasks.listTasksBySolution(solution)
		if (solvedTasks.length === 0) {
			client.client.log(`Miss. No task can be solved by ${solution}.`)
			// @TODO: penalize
		} else {
			solvedTasks.forEach((task) => {
				client.client.log('Hit')
				task.hit(client)
			})
		}
	}

	clients.solution.addListener(handleSolution)

	const getShield = () => shield

	const destroy = () => {
		clearTimeout(loopTimeout)
		tasks.destroy()
		tasks.taskCountListener.removeListener(checkAllTasksSolved)
		clients.solution.removeListener(handleSolution)
	}

	return {
		destroy,
		getShield,
	}
}
