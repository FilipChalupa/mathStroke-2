import { Game } from '../Game.js'
import { State } from './State.js'
import { Lobby } from './Lobby.js'

export class StateManager {
	protected state: State = new Lobby(this.game)

	constructor(readonly game: Game) {}

	public getCurrentState() {
		return this.state
	}
}
