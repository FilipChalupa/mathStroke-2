import WebSocket from 'ws'
import { addRoomAnnouncement } from './room/messages/rooms'
import { Rooms } from './room/rooms'
import { upgradeHandler } from './utilities/upgradeHandler'

export const createRoomsServer = (rooms: Rooms) => {
	const ws = new WebSocket.Server({ noServer: true })

	const handleUpgrade = upgradeHandler(ws, (wsClient) => {
		console.log('New client connected.')

		rooms.listAll().forEach((room) => {
			addRoomAnnouncement(wsClient, room)
		})

		wsClient.addEventListener('close', () => {
			// @TODO
			console.log('Client disconnected.')
		})

		wsClient.addEventListener('message', (event) => {
			console.log('Message received: ', event.data)
		})
	})

	return {
		handleUpgrade,
	}
}
