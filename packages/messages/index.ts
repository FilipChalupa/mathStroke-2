import { ClientPlay, ServerPlay } from './play'
import { ClientRooms, ServerRooms } from './rooms'
import { ClientWatch, ServerWatch } from './watch'

export * from './play'
export * from './rooms'
export * from './watch'

export type AnyClientMessage =
	| ClientRooms.AnyMessage
	| ClientPlay.AnyMessage
	| ClientWatch.AnyMessage
export type AnyServerMessage =
	| ServerRooms.AnyMessage
	| ServerPlay.AnyMessage
	| ServerWatch.AnyMessage
