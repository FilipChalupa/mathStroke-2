import { ClientWatch } from '../watch'
export namespace ClientPlay {
	// @TODO: This is a placeholder
	export type Placeholder = {
		type: 'placeholder'
	}

	type AnyPlayMessage = Placeholder
	export type AnyMessage =
		| (AnyPlayMessage & { role: 'play' })
		| (ClientWatch.AnyMessage & { role: 'watch' })
}
