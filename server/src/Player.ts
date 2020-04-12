import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Payload } from './Payload.js'

export class Player {
	readonly id = generateId()
	protected isSpectating = true

	constructor(
		readonly socket: WebSocket,
		protected onDisconnectCallback: () => void,
	) {
		console.log('Player created')

		this.socket.on('message', this.onMessage)
		this.socket.on('close', this.onClose)
	}

	public send(data: Payload) {
		this.socket.send(JSON.stringify(data))
	}

	protected onMessage = (message: WebSocket.Data) => {
		console.log('New message', message)
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.onDisconnectCallback()
	}
}
