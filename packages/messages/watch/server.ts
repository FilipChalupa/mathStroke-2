import { Color } from 'utilities'
import { RoomState } from '../utilities'

export namespace ServerWatch {
	export type UpdateWatchersCount = {
		type: 'updateWatchersCount'
		count: number
	}

	export type AddPlayer = {
		type: 'addPlayer'
		id: string
		name: string
		color: Color
	}

	export type RemovePlayer = {
		type: 'removePlayer'
		id: string
	}

	export type UpdatePlayerInformation = {
		type: 'updatePlayerInformation'
		id: string
		name: string
		color: Color
	}

	export type UpdateRoomState = {
		type: 'updateRoomState'
		state: RoomState
	}

	export type UpdateShield = {
		type: 'updateShield'
		shield: number
	}

	export type AnyMessage =
		| UpdateWatchersCount
		| AddPlayer
		| RemovePlayer
		| UpdatePlayerInformation
		| UpdateRoomState
		| UpdateShield
}
