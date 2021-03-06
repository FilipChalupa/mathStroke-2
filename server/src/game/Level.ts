import { PayloadFromServer } from '../../../common/PayloadFromServer'
import { Player } from '../Player'
import { State } from './State'
import { Task } from './Task'

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

	public onPlayerSolutionSubmission(player: Player, solution: string) {
		console.log(player.getName(), solution)

		const solvedTaskIndex = this.tasksRunning.findIndex(
			(task) => task.getSolution() === solution,
		)

		if (solvedTaskIndex === -1) {
			// Task with that solution not found
			player.send(PayloadFromServer.createLevelSolutionVerdict(false, 3000)) // @TODO dynamic cooldown
			return
		}

		// Task with that solution found
		const cooldown = 1000 // @TODO dynamic cooldown
		player.send(PayloadFromServer.createLevelSolutionVerdict(true, cooldown))
		const solvedTask = this.tasksRunning[solvedTaskIndex]
		this.tasksRunning.splice(solvedTaskIndex, 1) // Remove solved task
		this.game.sendToAllPlayers(
			PayloadFromServer.createLevelTaskSolved(solvedTask.getId()),
		)
		this.game.sendToAllPlayers(
			PayloadFromServer.createPlayerMove({
				id: player.id,
				xPosition: Math.random(),
				timeInDestination: cooldown,
			}),
		)
		solvedTask.destroy()

		this.taskSolved++
		if (this.areAllTasksSolved()) {
			this.returnToLobby()
		}
	}

	protected getMinimumTasksCountToBeSolved() {
		return Math.ceil(
			this.tasksToBeSolvedCountBase *
				Math.pow(
					Level.tasksToBeSolvedCountMultiplier,
					Math.max(0, this.game.getNonSpectactingPlayers().length - 1),
				),
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
		this.returnToLobby()
	}

	protected returnToLobby() {
		;[this.generateNewTaskTimer, this.returnToLobbyTimer].forEach(
			(timer) => timer && clearTimeout(timer),
		)
		this.returnToLobbyTimer = setTimeout(
			this.stateManager.goToLobby,
			Level.returnToLobbyAfter,
		)
	}

	protected createTaskPayload = (task: Task) =>
		PayloadFromServer.createLevelNewTask(
			task.getId(),
			task.getInstructions().getText(),
			task.getXPosition(),
		)

	protected generateNewTask = () => {
		console.log('Generate')
		if (this.generateNewTaskTimer) {
			clearTimeout(this.generateNewTaskTimer)
		}

		if (this.areAllTasksGenerated()) {
			return
		}

		const task = new Task({
			onInitialization: (task) => {
				console.log(
					'New task with solution',
					task.getSolution(),
					' has been generated.',
				)
				this.game.sendToAllPlayers(this.createTaskPayload(task))
			},
			onTaskExpired: (task) => {
				console.log('Task with solution', task.getSolution(), 'expired')
				this.onFail()
			},
		})

		this.tasksRunning.push(task)

		this.generateNewTaskTimer = setTimeout(this.generateNewTask, 3000) // @TODO: calculate proper duration
	}

	public onPlayerConnect(player: Player) {
		this.tasksRunning.forEach((task) => {
			player.send(this.createTaskPayload(task))
		})
	}
}
