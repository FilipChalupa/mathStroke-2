export type AddRoomAnnouncement = {
	type: 'add-room-announcement'
}

export type RemoveRoomAnnouncement = {
	type: 'remove-room-announcement'
}

export type AnyServerMessage = AddRoomAnnouncement | RemoveRoomAnnouncement
