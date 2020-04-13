import { State } from './State.js'

export class Level extends State {
	readonly name = 'level'

	protected goToLobbyTimer: null | NodeJS.Timeout = null

	public initialize() {
		this.goToLobbyTimer = setTimeout(() => {
			this.stateManager.goToLobby()
		}, 5000)
	}

	public destroy() {
		if (this.goToLobbyTimer) {
			clearTimeout(this.goToLobbyTimer)
		}
	}
}
