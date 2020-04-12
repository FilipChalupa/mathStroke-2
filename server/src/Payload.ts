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
			isSpectating: player.getIsSpectating(),
			isReady: player.getIsReady(),
			name: player.getName(),
		},
	})

	export const disconnectedPlayer = (player: Player) => ({
		disconnected: {
			id: player.id,
		},
	})
}
