import WebSocket from 'ws'
import { PayloadFromClient } from '../../common/PayloadFromClient.js'
import { PayloadFromServer } from '../../common/PayloadFromServer.js'
import { PlayerCommon } from '../../common/PlayerCommon.js'
import { generateId } from './generateId.js'

export class Player extends PlayerCommon {
	constructor(
		readonly socket: WebSocket,
		protected callbacks: {
			onDisconnect: () => void
			onIsReadyChange: () => void
			onIsSpectatingChange: () => void
			onSolutionSubmission: (solution: string) => void
		},
	) {
		super(
			generateId(),
			false,
			false,
			`John ${Math.round(10 + Math.random() * 89)}`,
			0.5,
		)

		console.log('Player created')

		this.socket.on('message', this.onMessage)
		this.socket.on('close', this.onClose)
	}

	public send(data: PayloadFromServer) {
		this.socket.send(JSON.stringify(data))
	}

	public forceNotReadyLocally() {
		this.isReady = false
	}

	protected setIsSpectating(isSpectating: boolean) {
		this.isSpectating = isSpectating
		this.callbacks.onIsSpectatingChange()
		if (this.isSpectating) {
			this.setIsReady(false)
		}
	}

	protected setIsReady(isReady: boolean) {
		this.isReady = isReady
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
		} else {
			// @TODO: check type never in typescript compilation
			throw Error(`Unknown message type "${payload!.type}" from server.`)
		}
	}

	protected onClose = () => {
		console.log('Connection to player lost')
		this.callbacks.onDisconnect()
	}
}
