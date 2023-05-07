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

	export type AnyPlayOnlyMessage = SetPlayerInformation | SetReady
	export type AnyMessage =
		| (AnyPlayOnlyMessage & { role: 'play' })
		| (ClientWatch.AnyMessage & { role: 'watch' })
}
