import { PayloadFromServer } from '../../../common/PayloadFromServer'
import { Game } from '../Game'
import { Level } from './Level'
import { Lobby } from './Lobby'
import { State } from './State'

export class StateManager {
	protected state: State = this.createLobby()

	constructor(readonly game: Game) {}

	public getCurrentState() {
		return this.state
	}

	public startLevel() {
		console.log('Start new level')
		const nextLevel = this.createLevel()
		this.changeState(nextLevel)
	}

	public goToLobby = () => {
		console.log('Go to lobby')
		const lobby = this.createLobby()
		this.changeState(lobby)
	}

	protected createLobby() {
		return new Lobby(this.game, this)
	}

	protected createLevel() {
		return new Level(this.game, this)
	}

	protected changeState(newState: State) {
		this.state.destroy()
		this.state = newState
		this.game.sendToAllPlayers(
			PayloadFromServer.createGameState(this.state.name),
		)
		this.state.initialize()
	}
}
