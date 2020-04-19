import { Game } from '../Game.js'
import { Player } from '../Player.js'
import { StateManager } from './StateManager.js'

export abstract class State {
	abstract readonly name: string

	constructor(readonly game: Game, readonly stateManager: StateManager) {}

	public initialize() {}
	public onPlayerConnect(player: Player) {}
	public onPlayerDisconnect(player: Player) {}
	public onPlayerIsReadyChange(player: Player) {}
	public onPlayerIsSpectatingChange(player: Player) {}
	public onPlayerSolutionSubmission(player: Player, solution: string) {}

	public destroy() {}
}
