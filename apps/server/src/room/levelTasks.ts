import { listenable } from 'custom-listenable'
import { TaskLevelEvent } from '../utilities/LevelTimeline'
import { createClients } from './clients'
import { LevelTask, createLevelTask } from './levelTask'

export const createLevelTasks = (
	log: (message: string) => void,
	clients: ReturnType<typeof createClients>,
	onDemageHit: (shieldDamage: number) => void,
) => {
	const tasks: LevelTask[] = []

	const isUniqueSolution = (solution: string) =>
		tasks.every((task) => !task.canBeSolvedBy(solution))

	const startEvent = (
		event: TaskLevelEvent,
		speedMultiplier: number,
		playerCountMultiplier: number,
	) => {
		log(
			`Starting event ${event.type} with speed multiplier ${speedMultiplier} and player count multiplier ${playerCountMultiplier}`,
		)
		const task = createLevelTask(
			log,
			clients,
			event,
			speedMultiplier,
			playerCountMultiplier,
			(shieldDamage) => {
				onDemageHit(shieldDamage)
			},
			() => {
				log(`Event ${event.type} finished`)
				removeTask(task)
			},
			isUniqueSolution,
		)
		addTask(task)
	}

	const addTask = (task: LevelTask) => {
		tasks.push(task)
		taskCountListener.emit(getRemainingTaskCount())
	}
	const removeTask = (task: LevelTask) => {
		const taskIndex = tasks.findIndex((other) => other === task)
		if (taskIndex < 0) {
			throw new Error('Trying to remove a task that does not exist')
		}
		tasks.splice(taskIndex, 1)
		taskCountListener.emit(getRemainingTaskCount())
	}

	const listTasksBySolution = (solution: string) => {
		return tasks.filter((task) => task.canBeSolvedBy(solution))
	}

	const destroy = () => {
		tasks.forEach((task) => {
			task.destroy()
		})
	}

	const getRemainingTaskCount = () => tasks.length

	const taskCountListener = listenable<number>()

	return {
		destroy,
		getRemainingTaskCount,
		taskCountListener,
		startEvent,
		listTasksBySolution,
	}
}
