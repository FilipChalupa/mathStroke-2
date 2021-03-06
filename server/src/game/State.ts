import { Game } from '../Game'
import { Player } from '../Player'
import { StateManager } from './StateManager'

export abstract class State {
	abstract readonly name: 'level' | 'lobby'

	constructor(readonly game: Game, readonly stateManager: StateManager) {}

	public initialize() {}
	public onPlayerConnect(player: Player) {}
	public onPlayerDisconnect(player: Player) {}
	public onPlayerIsReadyChange(player: Player) {}
	public onPlayerIsSpectatingChange(player: Player) {}
	public onPlayerSolutionSubmission(player: Player, solution: string) {}

	public destroy() {}
}
