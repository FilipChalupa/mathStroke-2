import { State } from './State.js'
import { Payload } from '../Payload.js'

const READY_PLAYERS_TO_START_COUNTDOWN_RATIO = 0.7
const READY_PLAYERS_TO_START_IMMEDIATELY_RATIO = 0.9

const COUNTDOWN_DURATION = 31000 // 31 seconds
const IMMEDIATE_COUNTDOWN_DURATION = 4000 // 4 seconds

export class Lobby extends State {
	readonly name = 'lobby'

	protected countdownTimer: null | NodeJS.Timeout = null
	protected countdownFinishTime = Number.MAX_SAFE_INTEGER

	public initialize() {
		this.game.clearIsReady()
		this.game.sendToAllPlayers(Payload.lobbyCountdown(null))
	}

	public onPlayerConnect() {
		this.checkReadiness()
	}
	public onPlayerDisconnect() {
		this.checkReadiness()
	}
	public onPlayerIsReadyChange() {
		this.checkReadiness()
	}
	public onPlayerIsSpectatingChange() {
		this.checkReadiness()
	}

	protected checkReadiness() {
		const nonSpectactingPlayers = this.game.getNonSpectactingPlayers()
		const nonSpectactingPlayersCount = nonSpectactingPlayers.length
		const readyPlayersCount = nonSpectactingPlayers.filter((player) =>
			player.getIsReady(),
		).length

		const readyRatio = readyPlayersCount / nonSpectactingPlayersCount

		if (readyRatio >= READY_PLAYERS_TO_START_IMMEDIATELY_RATIO) {
			this.setCountdown(IMMEDIATE_COUNTDOWN_DURATION)
		} else if (readyRatio >= READY_PLAYERS_TO_START_COUNTDOWN_RATIO) {
			this.setCountdown(COUNTDOWN_DURATION)
		} else {
			this.stopCountdown()
		}
	}

	protected setCountdown(duration: number) {
		const currentTime = new Date().getTime()
		const newCountDownFinishTime = currentTime + duration

		if (newCountDownFinishTime >= this.countdownFinishTime) {
			return
		}
		if (this.countdownTimer !== null) {
			clearTimeout(this.countdownTimer)
		}
		this.countdownFinishTime = newCountDownFinishTime
		this.countdownTimer = setTimeout(() => {
			this.stateManager.startLevel()
		}, duration)

		this.game.sendToAllPlayers(Payload.lobbyCountdown(duration))
	}

	protected stopCountdown() {
		if (this.countdownTimer === null) {
			return
		}
		clearTimeout(this.countdownTimer)
		this.countdownTimer = null
		this.countdownFinishTime = Number.MAX_SAFE_INTEGER

		this.game.sendToAllPlayers(Payload.lobbyCountdown(null))
	}

	public destroy() {
		if (this.countdownTimer) {
			clearTimeout(this.countdownTimer)
		}
	}
}
