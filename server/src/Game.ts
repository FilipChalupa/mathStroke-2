import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Player } from './Player.js'

export class Game {
	readonly id = generateId()
	protected socketServer = new WebSocket.Server({ noServer: true })
	protected players: Player[] = []

	constructor(readonly name: string, readonly isPublic: boolean) {
		this.socketServer.on('connection', (socket: WebSocket) => {
			const player = new Player(socket, () => {
				this.players = this.players.filter((x) => x.id !== player.id)
			})
			this.players.push(player)
		})
	}

	public handleIncomingConnection(request: any, socket: any, head: any) {
		this.socketServer.handleUpgrade(request, socket, head, (ws) => {
			this.socketServer.emit('connection', ws)
		})
	}

	public getPlayersCount() {
		return this.players.length
	}
}
