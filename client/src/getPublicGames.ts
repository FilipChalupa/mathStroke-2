import { parseApi, parseArray, parseObject, parseString } from './parseApi.ts'

export const getPublicGamesRequestParser = parseApi({
	games: parseArray(
		parseObject({
			name: parseString(),
			id: parseString(),
		}),
	),
})

export async function getPublicGames() {
	const response = await fetch('/public-games.json')
	const data = await response.json()
	return getPublicGamesRequestParser(data).games
}
