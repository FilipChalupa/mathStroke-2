import { Color } from 'utilities'
import { ClientWatch } from '../watch'

export namespace ClientPlay {
	export type SetPlayerInformation = {
		type: 'setPlayerInformation'
		name: string
		color: Color
	}

	export type AnyPlayOnlyMessage = SetPlayerInformation
	export type AnyMessage =
		| (AnyPlayOnlyMessage & { role: 'play' })
		| (ClientWatch.AnyMessage & { role: 'watch' })
}
