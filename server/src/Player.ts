import WebSocket from 'ws'
import { generateId } from './generateId.js'

export class Player {
	readonly id = generateId()

	constructor(readonly socket: WebSocket, protected onDisconnect: () => void) {
		console.log('Player created')

		this.socket.on('message', this.onMessage)
		this.socket.on('close', this.onClose)

		this.socket.send('Hello from server')
	}

	protected onMessage = (message: WebSocket.Data) => {
		console.log('New message', message)
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.onDisconnect()
	}
}
