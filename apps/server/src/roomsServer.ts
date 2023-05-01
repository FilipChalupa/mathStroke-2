import { ClientRooms, ServerRooms } from 'messages'
import { Rooms } from './room/rooms'
import { createServer } from './utilities/createServer'

export const createRoomsServer = (rooms: Rooms) => {
	const server = createServer<ClientRooms.AnyMessage, ServerRooms.AnyMessage>(
		'rooms',
	)

	server.addNewClientListener((client) => {
		rooms.listAll().forEach((room) => {
			client.action('addRoomAnnouncement', {
				id: room.getId(),
				name: room.getName(), // @TODO
			})
		})

		client.addMessageListener((message) => {
			if (message.type === 'requestNewRoom') {
				rooms.create(message.name)
			} else {
				// @TODO assertNever(message)
			}
		})
	})

	rooms.addNewRoomListener((room) => {
		server.listClients().forEach((client) => {
			client.action('addRoomAnnouncement', {
				id: room.getId(),
				name: room.getName(), // @TODO
			})
		})
	})

	return {
		handleUpgrade: server.handleUpgrade,
	}
}
