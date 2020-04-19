import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Payload } from './Payload.js'
import { PayloadFromClient } from '../../common/Payload.js'

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
			onSolutionSubmission: (solution: string) => void
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

	public forceNotReadyLocally() {
		this.isReady = false
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

	protected submitSolution(solution: string) {
		this.callbacks.onSolutionSubmission(solution)
	}

	protected onMessage = (message: WebSocket.Data) => {
		if (typeof message !== 'string') {
			throw new Error(`Unknown message type "${typeof message}".`)
		}
		const payload = JSON.parse(message) as PayloadFromClient

		console.log('New message from client')
		console.log('Type:', payload.type)
		console.log('Data:', payload.data)

		if (payload.type === PayloadFromClient.Type.IsReady) {
			this.setIsReady(payload.data.value)
		} else if (payload.type === PayloadFromClient.Type.IsSpectating) {
			this.setIsSpectating(payload.data.value)
		} else if (payload.type === PayloadFromClient.Type.SubmitSolution) {
			this.submitSolution(payload.data.value)
		}
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.callbacks.onDisconnect()
	}
}
