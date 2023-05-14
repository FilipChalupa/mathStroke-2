import { LevelEvent } from '../utilities/LevelTimeline'
import { createRandomGenerator } from '../utilities/createRandomGenerator'
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
		clients.solution.removeListener(handleSolution) // Ignore solutions when level is over
		setTimeout(() => {
			onFinished(byWin)
		}, 2000)
	}

	// @TODO: use level name
	const singlePlayerTimeline = structuredClone(
		levels[(levelNumber - 1) % levels.length].timeline,
	)
	const timeline: LevelEvent[] = []
	const speedMultiplier = 1 + Math.floor((levelNumber - 1) / levels.length)
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

	const getPlayerCountMultiplier = () => Math.max(1, clients.getPlayerCount())

	const startTimelineEvent = (event: LevelEvent) => {
		if (event.type === 'nothing') {
			return
		}
		tasks.startEvent(event, speedMultiplier, getPlayerCountMultiplier())
	}

	const timelineProceed = (() => {
		const random = createRandomGenerator(levelNumber)
		return () => {
			clearTimeout(timelineProceedTimeout)
			if (timeline.length === 0) {
				const nextSinglePlayerEvent = singlePlayerTimeline.shift()
				if (nextSinglePlayerEvent !== undefined) {
					if (nextSinglePlayerEvent.type === 'nothing') {
						timeline.push(nextSinglePlayerEvent)
					} else {
						// Multiply number of events by player count
						const multiplier = getPlayerCountMultiplier()
						const timesToMultiply = random(1, multiplier)
						nextSinglePlayerEvent.durationMilliseconds = Math.round(
							nextSinglePlayerEvent.durationMilliseconds / timesToMultiply,
						)
						for (let i = 0; i < timesToMultiply; i++) {
							timeline.push(nextSinglePlayerEvent)
						}
					}
				}
			}
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
	})()

	setTimeout(() => {
		timelineProceed()
	})

	const checkAllTasksSolved = () => {
		if (tasks.getRemainingTaskCount() !== 0) {
			return
		}
		if (timeline.length === 0 && singlePlayerTimeline.length === 0) {
			log('All tasks solved')
			if (shield > 0) {
				handleFinish(true)
			}
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
