import { Color } from 'utilities'
import { ClientWatch } from '../watch'

export namespace ClientPlay {
	export type SetPlayerInformation = {
		type: 'setPlayerInformation'
		name: string
		color: Color
	}

	export type SetReady = {
		type: 'setReady'
		ready: boolean
	}

	export type SendSolution = {
		type: 'sendSolution'
		solution: string
	}

	export type AnyPlayOnlyMessage =
		| SetPlayerInformation
		| SetReady
		| SendSolution
	export type AnyMessage =
		| (AnyPlayOnlyMessage & { role: 'play' })
		| (ClientWatch.AnyMessage & { role: 'watch' })
}
