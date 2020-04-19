import { Instructions } from './Instructions'
import { getCurrentTimestamp } from '../../../common/getCurrentTimestamp'

export class Task {
	protected expirationTimer: NodeJS.Timeout
	protected track = Math.random()
	protected createdAt = getCurrentTimestamp()
	protected timeToSolve = 5000 // 5 seconds // @TODO: calculate proper duration

	constructor(
		protected readonly instructions: Instructions,
		readonly solution: string,
		protected readonly callbacks: {
			onTaskExpired: (task: Task) => void
		},
	) {
		this.expirationTimer = setTimeout(
			() => this.callbacks.onTaskExpired(this),
			this.timeToSolve,
		)
	}

	public destroy() {
		clearTimeout(this.expirationTimer)
	}
}
