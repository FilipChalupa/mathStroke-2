import { ServerWatch } from '../watch'
export namespace ServerPlay {
	// @TODO: This is a placeholder
	export type Placeholder = {
		type: 'placeholder'
	}

	type AnyPlayMessage = Placeholder
	export type AnyMessage =
		| (AnyPlayMessage & { role: 'play' })
		| (ServerWatch.AnyMessage & { role: 'watch' })
}
