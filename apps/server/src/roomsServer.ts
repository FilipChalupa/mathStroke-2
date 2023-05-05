import { ClientRooms, ServerRooms } from 'messages'
import { assertNever } from 'utilities'
import { Room } from './room'
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
				playerCount: room.getPlayerCount(),
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

	const handlePlayerCountChange = (room: Room, playerCount: number) => {
		broadcastAction({
			type: 'updateRoomPlayerCount',
			id: room.getId(),
			playerCount,
		})
	}

	const broadcastAction = (message: ServerRooms.AnyMessage) => {
		server.listClients().forEach((client) => {
			client.action(message)
		})
	}

	rooms.addNewRoomListener((room) => {
		room.addPlayerCountListener((playerCount) => {
			handlePlayerCountChange(room, playerCount)
		})
		broadcastAction({
			type: 'addRoomAnnouncement',
			id: room.getId(),
			name: room.getName(),
			playerCount: room.getPlayerCount(),
		})
	})

	// @TODO: listen to room removals

	return {
		handleUpgrade: server.handleUpgrade,
	}
}
