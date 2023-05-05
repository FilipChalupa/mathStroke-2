export namespace ServerRooms {
	export type AddRoomAnnouncement = {
		type: 'addRoomAnnouncement'
		id: string
		name: string
		playerCount: number
	}

	export type RemoveRoomAnnouncement = {
		type: 'removeRoomAnnouncement'
		id: string
	}

	export type UpdateRoomPlayerCount = {
		type: 'updateRoomPlayerCount'
		id: string
		playerCount: number
	}

	export type AnyMessage =
		| AddRoomAnnouncement
		| RemoveRoomAnnouncement
		| UpdateRoomPlayerCount
}
