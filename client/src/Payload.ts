export type Payload = {
	[key: string]: any
}

export namespace Payload {
	export const isSpectating = (isSpectating: boolean) => ({ isSpectating })
	export const isReady = (isReady: boolean) => ({ isReady })
	export const submitSolution = (solution: string) => ({ solution })
}
