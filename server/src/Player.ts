import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Payload } from './Payload.js'

export class Player {
	readonly id = generateId()
	protected isSpectating = true
	protected isReady = true
	protected name = `John ${Math.round(10 + Math.random() * 89)}`

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

	public getIsSpectating() {
		return this.isSpectating
	}

	public getIsReady() {
		return this.isReady
	}

	public getName() {
		return this.name
	}

	protected onMessage = (message: WebSocket.Data) => {
		console.log('New message', message)
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.onDisconnectCallback()
	}
}
