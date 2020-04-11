import { parseApi, parseString } from './parseApi'

export const createGameRequestParser = parseApi({
	gameId: parseString(),
})

export async function createGame(gameName: string, isPublic: boolean) {
	const response = await fetch('/create-game.json', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ gameName, isPublic }),
	})
	const data = await response.json()
	return createGameRequestParser(data)
}
