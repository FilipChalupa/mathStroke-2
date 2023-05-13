import { ServerWatch } from '../watch'
export namespace ServerPlay {
	export type SetId = {
		type: 'setId'
		id: string
	}

	export type ConfirmHit = {
		type: 'confirmHit'
	}

	export type AnyPlayMessage = SetId | ConfirmHit
	export type AnyMessage =
		| (AnyPlayMessage & { role: 'play' })
		| (ServerWatch.AnyMessage & { role: 'watch' })
}
