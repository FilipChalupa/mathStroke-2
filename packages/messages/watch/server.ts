import { Color } from 'utilities'
import { RoomState } from '../utilities'

export namespace ServerWatch {
	export type UpdateWatchersCount = {
		type: 'updateWatchersCount'
		count: number
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
		ready: boolean
	}

	export type UpdateRoomState = {
		type: 'updateRoomState'
		state: RoomState
	}

	export type UpdateShield = {
		type: 'updateShield'
		shield: number
	}

	export type AddBasicTask = {
		type: 'addBasicTask'
		taskId: string
		label: string
		position: number
		timeToImpactMilliseconds: number
	}

	export type DestroyBasicTask = {
		type: 'destroyBasicTask'
		taskId: string
		byPlayerId: string | null
	}

	export type AnyMessage =
		| UpdateWatchersCount
		| RemovePlayer
		| UpdatePlayerInformation
		| UpdateRoomState
		| UpdateShield
		| AddBasicTask
		| DestroyBasicTask
}
