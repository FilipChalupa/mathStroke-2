import { ClientRooms, ServerRooms } from 'messages'
import { assertNever } from 'utilities'
import { Rooms } from './room/rooms'
import { createServer } from './utilities/createServer'

export const createRoomsServer = (rooms: Rooms) => {
	const server = createServer<ClientRooms.AnyMessage, ServerRooms.AnyMessage>(
		'rooms',
	)

	server.addNewClientListener((client) => {
		rooms.listAll().forEach((room) => {
			client.action({
				type: 'addRoomAnnouncement',
				id: room.getId(),
				name: room.getName(),
			})
		})

		client.addMessageListener((message) => {
			if (message.type === 'requestNewRoom') {
				rooms.create(message.name)
			} else {
				assertNever(message.type)
			}
		})
	})

	rooms.addNewRoomListener((room) => {
		server.listClients().forEach((client) => {
			client.action({
				type: 'addRoomAnnouncement',
				id: room.getId(),
				name: room.getName(),
			})
		})
	})

	return {
		handleUpgrade: server.handleUpgrade,
	}
}
