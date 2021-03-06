export abstract class PlayerCommon {
	constructor(
		readonly id: string,
		protected isSpectating: boolean,
		protected isReady: boolean,
		protected name: string,
		protected xPosition: {
			last: number
			lastTime: number
			target: number
			targetTime: number
		},
	) {}

	public getIsSpectating() {
		return this.isSpectating
	}

	public getIsReady() {
		return this.isReady
	}

	public getName() {
		return this.name
	}

	public getXPosition() {
		return this.xPosition
	}
}
