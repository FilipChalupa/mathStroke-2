import { LevelEvent } from '../utilities/LevelTimeline'
import { createClients } from './clients'
import { createLevelTasks } from './levelTasks'
import { levels } from './levels'

export type Level = ReturnType<typeof createLevel>

export const createLevel = (
	log: (message: string) => void,
	clients: ReturnType<typeof createClients>,
	levelNumber: number,
	onFinished: (byWin: boolean) => void,
) => {
	let handleFinishTimeout: NodeJS.Timeout
	const handleFinish = (byWin: boolean) => {
		setTimeout(() => {
			clients.solution.removeListener(handleSolution) // Ignore solutions when level is over
			onFinished(byWin)
		}, 2000)
	}

	// @TODO: use level name
	const timeline = levels[(levelNumber - 1) % levels.length].timeline.map(
		(event) => event, // @TODO: transform into multiple events based on player count
	)
	const speedMultiplier = 1 + Math.floor((levelNumber - 1) / levels.length)
	const playerCountMultiplier = 1 // @TODO
	let shield = 3 // @TODO
	let timelineProceedTimeout: NodeJS.Timeout
	const tasks = createLevelTasks(log, clients, (shieldDamage) => {
		shield = Math.max(0, shield - shieldDamage)
		log(`Hit by damage ${shieldDamage}. Shield is now ${shield}.`)
		clients.actions.updateShield(shield)
		if (shield === 0) {
			handleFinish(false)
		}
	})

	const startTimelineEvent = (event: LevelEvent) => {
		if (event.type === 'nothing') {
			return
		}
		tasks.startEvent(event, speedMultiplier, playerCountMultiplier)
	}

	const timelineProceed = () => {
		clearTimeout(timelineProceedTimeout)
		const event = timeline.shift()
		if (event === undefined) {
			log('All events started')
			checkAllTasksSolved()
			return
		}

		startTimelineEvent(event)

		timelineProceedTimeout = setTimeout(
			timelineProceed,
			Math.round(event.durationMilliseconds / speedMultiplier),
		)
	}

	setTimeout(() => {
		timelineProceed()
	})

	const checkAllTasksSolved = () => {
		if (tasks.getRemainingTaskCount() !== 0) {
			return
		}
		if (timeline.length === 0) {
			log('All tasks solved')
			handleFinish(true)
		} else {
			timelineProceed()
		}
	}
	tasks.taskCountListener.addListener(checkAllTasksSolved)

	const handleSolution: Parameters<typeof clients.solution.addListener>[0] = ({
		client,
		solution,
	}) => {
		const solvedTasks = tasks.listTasksBySolution(solution)
		if (solvedTasks.length === 0) {
			client.client.log(`Miss. No task can be solved by ${solution}.`)
			// @TODO: don't confirm hit but penalize
			client.client.action({
				role: 'play',
				type: 'confirmHit',
			})
			client.jammedCount++
		} else {
			solvedTasks.forEach((task) => {
				client.client.log('Hit')
				task.hit(client)
				client.hitCount++
			})
			client.client.action({
				role: 'play',
				type: 'confirmHit',
			})
		}
		clients.actions.sendPlayerToAll(client) // Broadcasts new jammedCount and hitCount
	}

	clients.solution.addListener(handleSolution)

	const getShield = () => shield

	const destroy = () => {
		clearTimeout(timelineProceedTimeout)
		clearTimeout(handleFinishTimeout)
		tasks.destroy()
		tasks.taskCountListener.removeListener(checkAllTasksSolved)
		clients.solution.removeListener(handleSolution)
	}

	return {
		destroy,
		getShield,
	}
}
