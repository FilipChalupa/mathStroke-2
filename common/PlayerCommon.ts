export abstract class PlayerCommon {
	constructor(
		readonly id: string,
		protected isSpectating: boolean,
		protected isReady: boolean,
		protected name: string,
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
}
