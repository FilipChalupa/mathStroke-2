import WebSocket from 'ws'
import { upgradeHandler } from './utilities/upgradeHandler'

export const createRoomsServer = () => {
	const ws = new WebSocket.Server({ noServer: true })

	const handleUpgrade = upgradeHandler(ws, (wsClient) => {
		console.log('New client', wsClient)
	})

	return {
		handleUpgrade,
	}
}
