import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Player } from './Player.js'
import { Payload } from './Payload.js'

export class Game {
	readonly id = generateId()
	protected socketServer = new WebSocket.Server({ noServer: true })
	protected players: Player[] = []
	protected state: 'lobby' | 'level' = 'lobby'

	constructor(readonly name: string, readonly isPublic: boolean) {
		this.socketServer.on('connection', (socket: WebSocket) => {
			const player = new Player(socket, () => {
				this.players = this.players.filter((x) => x.id !== player.id)
				this.sendToAllPlayers(Payload.disconnectedPlayer(player))
			})
			this.sendToAllPlayers(Payload.connectedPlayer(player))
			this.players.push(player)
			this.sendCatchUpData(player)
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

	protected sendToPlayer(player: Player, data: Payload) {
		player.send(data)
	}

	protected sendToAllPlayers(data: Payload) {
		this.players.forEach((player) => {
			this.sendToPlayer(player, data)
		})
	}

	protected sendCatchUpData(player: Player) {
		this.sendToPlayer(player, Payload.state(this.state))

		this.players.forEach((otherPlayer) => {
			this.sendToPlayer(player, Payload.connectedPlayer(otherPlayer))
		})
	}
}
