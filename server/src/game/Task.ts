import { getCurrentTimestamp } from '../../../common/getCurrentTimestamp'
import { generateId } from '../generateId'
import { Instructions } from './Instructions'

export class Task {
	protected expirationTimer: NodeJS.Timeout
	protected track = Math.random()
	protected createdAt = getCurrentTimestamp()
	protected timeToSolve = 5000 * 0 + 500000 // 5 seconds // @TODO: calculate proper duration
	protected solution: string
	protected instructions: Instructions
	protected id = generateId()
	protected xPosition = Math.random()

	constructor(
		protected readonly callbacks: {
			onInitialization: (task: Task) => void
			onTaskExpired: (task: Task) => void
		},
	) {
		const a = Math.floor(Math.random() * 20)
		const b = Math.floor(Math.random() * 20)
		this.instructions = new Instructions(`${a} + ${b}`)
		this.solution = `${a + b}`

		this.expirationTimer = setTimeout(
			() => this.callbacks.onTaskExpired(this),
			this.timeToSolve,
		)

		this.callbacks.onInitialization(this)
	}

	public getId() {
		return this.id
	}

	public getSolution() {
		return this.solution
	}

	public getInstructions() {
		return this.instructions
	}

	public getXPosition() {
		return this.xPosition
	}

	public destroy() {
		clearTimeout(this.expirationTimer)
	}
}
