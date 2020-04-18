import { Instructions } from './Instructions'

export class Task {
	protected expirationTimer: NodeJS.Timeout

	constructor(
		protected readonly instructions: Instructions,
		readonly solution: string,
		protected readonly callbacks: {
			onTaskExpired: (task: Task) => void
		},
	) {
		this.expirationTimer = setTimeout(
			() => this.callbacks.onTaskExpired(this),
			5000,
		) // @TODO: calculate proper duration
	}

	public destroy() {
		clearTimeout(this.expirationTimer)
	}
}
