import WebSocket from 'ws'
import { Rooms } from './room/rooms'
import { upgradeHandler } from './utilities/upgradeHandler'

export const createRoomsServer = (rooms: Rooms) => {
	const ws = new WebSocket.Server({ noServer: true })

	const handleUpgrade = upgradeHandler(ws, (wsClient) => {
		console.log('New client')

		wsClient.addEventListener('message', (event) => {
			console.log('Message received: ', event.data)
		})
	})

	return {
		handleUpgrade,
	}
}
