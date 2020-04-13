import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Payload } from './Payload.js'

export class Player {
	readonly id = generateId()
	protected isSpectating = false
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

	protected setIsSpectating(isSpectating: boolean) {
		this.isSpectating = Boolean(isSpectating)
		this.callbacks.onIsSpectatingChange()
		if (this.isSpectating) {
			this.setIsReady(false)
		}
	}

	protected setIsReady(isReady: boolean) {
		this.isReady = Boolean(isReady)
		this.callbacks.onIsReadyChange()
	}

	protected onMessage = (message: WebSocket.Data) => {
		if (typeof message !== 'string') {
			throw new Error(`Unknown message type "${typeof message}".`)
		}
		const data = JSON.parse(message)
		console.log('New message', data)

		if (typeof data.isSpectating !== 'undefined') {
			this.setIsSpectating(data.isSpectating)
		}
		if (typeof data.isReady !== 'undefined') {
			this.setIsReady(data.isReady)
		}
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.callbacks.onDisconnect()
	}
}
