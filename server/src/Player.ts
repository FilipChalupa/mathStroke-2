import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Payload } from './Payload.js'

export class Player {
	readonly id = generateId()
	protected isSpectating = true
	protected isReady = false
	protected name = `John ${Math.round(10 + Math.random() * 89)}`

	constructor(
		readonly socket: WebSocket,
		protected callbacks: {
			onDisconnect: () => void
			onIsReadyChange: () => void
			onIsSpectatingChange: () => void
		},
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
		if (typeof message !== 'string') {
			throw new Error(`Unknown message type "${typeof message}".`)
		}
		const data = JSON.parse(message)
		console.log('New message', data)

		if (typeof data.isSpectating !== 'undefined') {
			this.isSpectating = Boolean(data.isSpectating)
			this.callbacks.onIsSpectatingChange()
		}
		if (typeof data.isReady !== 'undefined') {
			this.isReady = Boolean(data.isReady)
			this.callbacks.onIsReadyChange()
		}
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.callbacks.onDisconnect()
	}
}
