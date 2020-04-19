import { State } from './State.js'
import { Game } from '../Game.js'
import { StateManager } from './StateManager.js'
import { Task } from './Task.js'
import { Instructions } from './Instructions.js'

export class Level extends State {
	readonly name = 'level'

	protected taskSolved = 0
	protected tasksRunning: Task[] = []
	protected generateNewTaskTimer: null | NodeJS.Timeout = null
	protected tasksToBeSolvedCountBase = 3 // @TODO: level specific
	protected returnToLobbyTimer: null | NodeJS.Timeout = null
	protected generateFirstTaskTimer: null | NodeJS.Timeout = null

	static tasksToBeSolvedCountMultiplier = 1.1
	static generateFirstTaskAfter = 3000
	static returnToLobbyAfter = 3000

	public initialize() {
		setTimeout(this.generateNewTask, Level.generateFirstTaskAfter)
	}

	public destroy() {
		;[
			this.generateNewTaskTimer,
			this.returnToLobbyTimer,
			this.generateFirstTaskTimer,
		].forEach((timer) => timer && clearTimeout(timer))

		this.tasksRunning.forEach((task) => {
			task.destroy()
		})
	}

	protected getMinimumTasksCountToBeSolved() {
		return (
			Math.max(0, this.game.getNonSpectactingPlayers().length - 1) *
			Level.tasksToBeSolvedCountMultiplier
		)
	}

	protected areAllTasksGenerated() {
		return (
			this.taskSolved + this.tasksRunning.length >=
			this.getMinimumTasksCountToBeSolved()
		)
	}

	protected areAllTasksSolved() {
		return this.taskSolved >= this.getMinimumTasksCountToBeSolved()
	}

	protected onFail() {
		console.log('failed')
		;[this.generateNewTaskTimer, this.returnToLobbyTimer].forEach(
			(timer) => timer && clearTimeout(timer),
		)
		this.returnToLobbyTimer = setTimeout(
			this.stateManager.goToLobby,
			Level.returnToLobbyAfter,
		)
	}

	protected generateNewTask = () => {
		console.log('Generate')
		if (this.generateNewTaskTimer) {
			clearTimeout(this.generateNewTaskTimer)
		}

		const instructions = new Instructions()
		const solution = `${Math.floor(Math.random() * 50)}` // @TODO: generate task with unique solution
		const task = new Task(instructions, solution, {
			onTaskExpired: (task) => {
				console.log('Task with solution', task.solution, 'expired')
				this.onFail()
			},
		})

		this.tasksRunning.push(task)
		console.log('New task with solution', task.solution, ' has been generated.')

		this.generateNewTaskTimer = setTimeout(this.generateNewTask, 3000) // @TODO: calculate proper duration
	}
}
