import { Game } from '../Game.js'
import { Player } from '../Player.js'

export abstract class State {
	abstract readonly name: string

	constructor(readonly game: Game) {
		this.initialize()
	}

	public initialize() {}
	public onPlayerConnect(player: Player) {}
	public onPlayerDisconnect(player: Player) {}
	public onPlayerIsReadyChange(player: Player) {}
	public onPlayerIsSpectatingChange(player: Player) {}

	public destroy() {}
}
