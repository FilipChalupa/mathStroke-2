import { ServerWatch } from '../watch'
export namespace ServerPlay {
	export type SetId = {
		type: 'setId'
		id: string
	}

	export type AnyPlayMessage = SetId
	export type AnyMessage =
		| (AnyPlayMessage & { role: 'play' })
		| (ServerWatch.AnyMessage & { role: 'watch' })
}
