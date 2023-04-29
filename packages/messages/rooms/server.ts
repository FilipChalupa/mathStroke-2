export namespace ServerRooms {
	export type AddRoomAnnouncement = {
		type: 'addRoomAnnouncement'
	}

	export type RemoveRoomAnnouncement = {
		type: 'removeRoomAnnouncement'
	}

	export type AnyMessage = AddRoomAnnouncement | RemoveRoomAnnouncement
}
