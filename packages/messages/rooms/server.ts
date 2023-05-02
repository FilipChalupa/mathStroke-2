export namespace ServerRooms {
	export type AddRoomAnnouncement = {
		type: 'addRoomAnnouncement'
		id: string
		name: string
	}

	export type RemoveRoomAnnouncement = {
		type: 'removeRoomAnnouncement'
		id: string
	}

	export type AnyMessage = AddRoomAnnouncement | RemoveRoomAnnouncement
}
