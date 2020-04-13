import { Player } from './Player.js'

export type Payload = {
	[key: string]: any
}

export namespace Payload {
	export const gameState = (gameState: string) => ({ gameState })

	export const gameName = (gameName: string) => ({ gameName })

	export const localPlayerId = (player: Player) => ({
		localPlayerId: player.id,
	})

	export const connectedPlayer = (player: Player) => ({
		playerConnected: {
			id: player.id,
			isSpectating: player.getIsSpectating(),
			isReady: player.getIsReady(),
			name: player.getName(),
		},
	})

	export const disconnectedPlayer = (player: Player) => ({
		playerDisconnected: {
			id: player.id,
		},
	})

	export const isSpectating = (player: Player) => ({
		isSpectating: {
			value: player.getIsSpectating(),
			playerId: player.id,
		},
	})

	export const isReady = (player: Player) => ({
		isReady: {
			value: player.getIsReady(),
			playerId: player.id,
		},
	})

	export const clearIsReady = () => ({
		clearIsReady: true,
	})

	export const lobbyCountdown = (duration: number | null) => ({
		lobbyCountdown: { duration },
	})
}
