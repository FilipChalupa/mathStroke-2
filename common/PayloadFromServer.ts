import { getCurrentTimestamp } from './getCurrentTimestamp'
import { PlayerCommon } from './PlayerCommon'

export namespace PayloadFromServer {
	export enum Type {
		GameState = 'GameState',
		GameName = 'GameName',
		LocalPlayerId = 'LocalPlayerId',
		ConnectedPlayer = 'ConnectedPlayer',
		DisconnectedPlayer = 'DisconnectedPlayer',
		IsSpectating = 'IsSpectating',
		IsReady = 'IsReady',
		ClearIsReady = 'ClearIsReady',
		LobbyCountdown = 'LobbyCountdown',
		LevelSolutionVerdict = 'LevelSolutionVerdict',
		LevelNewTask = 'LevelNewTask',
		LevelTaskSolved = 'LevelTaskSolved',
		TimeSynchronization = 'TimeSynchronization',
		PlayerMove = 'PlayerMove',
	}

	export interface GameState {
		type: Type.GameState
		data: {
			value: 'lobby' | 'level'
		}
	}

	export function createGameState(
		value: GameState['data']['value'],
	): GameState {
		return {
			type: Type.GameState,
			data: { value },
		}
	}

	export interface GameName {
		type: Type.GameName
		data: {
			value: string
		}
	}

	export function createGameName(value: string): GameName {
		return {
			type: Type.GameName,
			data: { value },
		}
	}

	export interface LocalPlayerId {
		type: Type.LocalPlayerId
		data: {
			value: string
		}
	}

	export function createLocalPlayerId(player: PlayerCommon): LocalPlayerId {
		return {
			type: Type.LocalPlayerId,
			data: {
				value: player.id,
			},
		}
	}
	export interface ConnectedPlayer {
		type: Type.ConnectedPlayer
		data: {
			id: string
			isSpectating: boolean
			isReady: boolean
			name: string
			xPosition: PlayerCommon['xPosition']
		}
	}

	export function createConnectedPlayer(player: PlayerCommon): ConnectedPlayer {
		return {
			type: Type.ConnectedPlayer,
			data: {
				id: player.id,
				isSpectating: player.getIsSpectating(),
				isReady: player.getIsReady(),
				name: player.getName(),
				xPosition: player.getXPosition(),
			},
		}
	}

	export interface DisconnectedPlayer {
		type: Type.DisconnectedPlayer
		data: {
			id: string
		}
	}

	export function createDisconnectedPlayer(
		player: PlayerCommon,
	): DisconnectedPlayer {
		return {
			type: Type.DisconnectedPlayer,
			data: {
				id: player.id,
			},
		}
	}

	export interface IsSpectating {
		type: Type.IsSpectating
		data: {
			playerId: string
			value: boolean
		}
	}

	export function createIsSpectating(player: PlayerCommon): IsSpectating {
		return {
			type: Type.IsSpectating,
			data: {
				playerId: player.id,
				value: player.getIsSpectating(),
			},
		}
	}

	export interface IsReady {
		type: Type.IsReady
		data: {
			playerId: string
			value: boolean
		}
	}

	export function createIsReady(player: PlayerCommon): IsReady {
		return {
			type: Type.IsReady,
			data: {
				playerId: player.id,
				value: player.getIsReady(),
			},
		}
	}

	export interface ClearIsReady {
		type: Type.ClearIsReady
		data: {}
	}

	export function createClearIsReady(): ClearIsReady {
		return {
			type: Type.ClearIsReady,
			data: {},
		}
	}

	export interface LobbyCountdown {
		type: Type.LobbyCountdown
		data: {
			duration: number | null
		}
	}

	export function createLobbyCountdown(
		duration: LobbyCountdown['data']['duration'],
	): LobbyCountdown {
		return {
			type: Type.LobbyCountdown,
			data: {
				duration,
			},
		}
	}

	export interface LevelSolutionVerdict {
		type: Type.LevelSolutionVerdict
		data: {
			isAccepted: boolean
			cooldown: number
		}
	}

	export function createLevelSolutionVerdict(
		isAccepted: boolean,
		cooldown: number,
	): LevelSolutionVerdict {
		return {
			type: Type.LevelSolutionVerdict,
			data: {
				isAccepted,
				cooldown,
			},
		}
	}

	export interface LevelNewTask {
		type: Type.LevelNewTask
		data: {
			id: string
			instructions: string
			xPosition: number
		}
	}

	export function createLevelNewTask(
		id: string,
		instructions: string,
		xPosition: number,
	): LevelNewTask {
		return {
			type: Type.LevelNewTask,
			data: {
				id,
				instructions,
				xPosition,
			},
		}
	}

	export interface LevelTaskSolved {
		type: Type.LevelTaskSolved
		data: {
			id: string
		}
	}

	export function createLevelTaskSolved(id: string): LevelTaskSolved {
		return {
			type: Type.LevelTaskSolved,
			data: {
				id,
			},
		}
	}

	export interface TimeSynchronization {
		type: Type.TimeSynchronization
		data: {
			timestamp: number
		}
	}

	export function createTimeSynchronization(): TimeSynchronization {
		return {
			type: Type.TimeSynchronization,
			data: { timestamp: getCurrentTimestamp() },
		}
	}

	export interface PlayerMove {
		type: Type.PlayerMove
		data: {
			id: string
			xPosition: number
			timeInDestination: number
		}
	}

	export function createPlayerMove(data: PlayerMove['data']): PlayerMove {
		return {
			type: Type.PlayerMove,
			data,
		}
	}
}

export type PayloadFromServer =
	| PayloadFromServer.GameState
	| PayloadFromServer.GameName
	| PayloadFromServer.LocalPlayerId
	| PayloadFromServer.ConnectedPlayer
	| PayloadFromServer.DisconnectedPlayer
	| PayloadFromServer.IsSpectating
	| PayloadFromServer.IsReady
	| PayloadFromServer.ClearIsReady
	| PayloadFromServer.LobbyCountdown
	| PayloadFromServer.LevelSolutionVerdict
	| PayloadFromServer.LevelNewTask
	| PayloadFromServer.LevelTaskSolved
	| PayloadFromServer.TimeSynchronization
	| PayloadFromServer.PlayerMove
