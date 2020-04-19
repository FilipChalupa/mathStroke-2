export namespace PayloadFromClient {
	export enum Type {
		IsSpectating = 'IsSpectating',
		IsReady = 'IsReady',
		SubmitSolution = 'SubmitSolution',
	}

	export interface IsSpectating {
		type: Type.IsSpectating
		data: {
			value: boolean
		}
	}

	export function createIsSpectating(value: boolean): IsSpectating {
		return {
			type: Type.IsSpectating,
			data: {
				value,
			},
		}
	}

	export interface IsReady {
		type: Type.IsReady
		data: {
			value: boolean
		}
	}

	export function createIsReady(value: boolean): IsReady {
		return {
			type: Type.IsReady,
			data: {
				value,
			},
		}
	}

	export interface SubmitSolution {
		type: Type.SubmitSolution
		data: {
			value: string
		}
	}

	export function createSubmitSolution(value: string): SubmitSolution {
		return {
			type: Type.SubmitSolution,
			data: {
				value,
			},
		}
	}
}

export type PayloadFromClient =
	| PayloadFromClient.IsSpectating
	| PayloadFromClient.IsReady
	| PayloadFromClient.SubmitSolution
