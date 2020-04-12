import { Player } from './Player.js'

export type Payload = {
	[key: string]: any
}

export namespace Payload {
	export const gameState = (gameState: string) => ({ gameState })

	export const gameName = (gameName: string) => ({ gameName })

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
