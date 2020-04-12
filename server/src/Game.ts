import WebSocket from 'ws'
import { generateId } from './generateId.js'
import { Player } from './Player.js'
import { Payload } from './Payload.js'

const CLOSE_EMPTY_GAME_AFTER = 30000 // 30 seconds

export class Game {
	readonly id = generateId()
	protected socketServer = new WebSocket.Server({ noServer: true })
	protected players: Player[] = []
	protected state: 'lobby' | 'level' = 'lobby'
	protected closeEmptyTimer: null | NodeJS.Timeout = null

	constructor(
		readonly name: string,
		readonly isPublic: boolean,
		readonly autoCloseEmpty: boolean,
		protected onCloseCallback: () => void,
	) {
		this.socketServer.on('connection', this.onConnection)

		this.socketServer.on('close', this.onClose)

		if (autoCloseEmpty) {
			this.startCloseEmptyCountdown()
		}
	}

	public close = () => {
		console.log('Close due to inactivity')
		this.socketServer.close()
	}

	protected startCloseEmptyCountdown() {
		this.closeEmptyTimer = setTimeout(this.close, CLOSE_EMPTY_GAME_AFTER)
	}

	protected stopCloseEmptyCountdown() {
		if (this.closeEmptyTimer) {
			clearTimeout(this.closeEmptyTimer)
		}
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
		this.sendToPlayer(player, Payload.gameState(this.state))
		this.sendToPlayer(player, Payload.gameName(this.name))

		this.players.forEach((otherPlayer) => {
			this.sendToPlayer(player, Payload.connectedPlayer(otherPlayer))
		})
	}

	protected onConnection = (socket: WebSocket) => {
		const player = new Player(socket, () => {
			this.players = this.players.filter((x) => x.id !== player.id)
			this.sendToAllPlayers(Payload.disconnectedPlayer(player))

			console.log('Players count', this.players.length)
			if (this.autoCloseEmpty && this.players.length === 0) {
				this.startCloseEmptyCountdown()
			}
		})
		this.sendToAllPlayers(Payload.connectedPlayer(player))
		this.players.push(player)
		this.sendCatchUpData(player)

		this.stopCloseEmptyCountdown()
	}

	protected onClose = () => {
		console.log('On close')
		this.stopCloseEmptyCountdown()
		this.onCloseCallback()
	}
}
