import { Player } from './Player.js'

export type Payload = {
	[key: string]: any
}

export namespace Payload {
	export const state = (state: string) => ({ state })

	export const connectedPlayer = (player: Player) => ({
		connected: {
			id: player.id,
		},
	})

	export const disconnectedPlayer = (player: Player) => ({
		disconnected: {
			id: player.id,
		},
	})
}
