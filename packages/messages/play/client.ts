import { Color } from 'utilities'
import { ClientWatch } from '../watch'

export namespace ClientPlay {
	export type SetPlayerInformation = {
		type: 'setPlayerInformation'
		name: string
		color: Color
	}

	type AnyPlayMessage = SetPlayerInformation
	export type AnyMessage =
		| (AnyPlayMessage & { role: 'play' })
		| (ClientWatch.AnyMessage & { role: 'watch' })
}
