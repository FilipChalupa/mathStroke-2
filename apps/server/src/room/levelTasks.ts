import { listenable } from 'custom-listenable'
import { TaskLevelEvent } from '../utilities/LevelTimeline'

export const createLevelTasks = (
	log: (message: string) => void,
	onDemageHit: (shieldDamage: number) => void,
) => {
	const tasks = []

	const startEvent = (
		event: TaskLevelEvent,
		speedMultiplier: number,
		playerCountMultiplier: number,
	) => {
		log(
			`Starting event ${event.type} with speed multiplier ${speedMultiplier} and player count multiplier ${playerCountMultiplier}`,
		)
	}

	const addTask = () => {
		taskCountListener.emit(getRemainingTaskCount())
	}
	const removeTask = () => {
		taskCountListener.emit(getRemainingTaskCount())
	}

	const destroy = () => {
		// tasks.forEach((task) => {
		// 	task.destroy()
		// })
	}

	// @TODO: remove
	setTimeout(() => {
		onDemageHit(2)
	}, 3000)
	setTimeout(() => {
		onDemageHit(1)
	}, 1000)

	const getRemainingTaskCount = () => tasks.length

	const taskCountListener = listenable<[count: number]>()

	return {
		destroy,
		getRemainingTaskCount,
		taskCountListener,
		startEvent,
	}
}
