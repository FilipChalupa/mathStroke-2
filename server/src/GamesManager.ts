import { Game } from './Game.js'

export class GamesManager {
	protected games: Game[] = []

	public createGame(name: string, isPublic: boolean, autoCloseEmpty: boolean) {
		const game = new Game(name, isPublic, autoCloseEmpty, () => {
			this.games = this.games.filter((x) => x.id !== game.id)
		})

		this.games.push(game)

		return game
	}

	public getGameById(id: string) {
		return this.games.find((game) => game.id === id)
	}

	public getPublicGames() {
		return this.games.filter((game) => game.isPublic)
	}
}
