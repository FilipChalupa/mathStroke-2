import { generateId } from './generateId.js'
import WebSocket from 'ws'

export class Game {
	readonly id = generateId()
	protected socketServer = new WebSocket.Server({ noServer: true })

	constructor(readonly name: string, readonly isPublic: boolean) {
		this.socketServer.on('connection', (socket: WebSocket) => {
			console.log('New connection')

			socket.send('Hello from server')

			socket.on('message', (message) => {
				console.log('New message', message)
			})
		})
	}

	public handleIncomingConnection(request: any, socket: any, head: any) {
		this.socketServer.handleUpgrade(request, socket, head, (ws) => {
			this.socketServer.emit('connection', ws)
		})
	}
}
