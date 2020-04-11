import {
	parseApi,
	parseArray,
	parseObject,
	parseString,
	parseNumber,
} from './parseApi'

export const getPublicGamesRequestParser = parseApi({
	games: parseArray(
		parseObject({
			name: parseString(),
			id: parseString(),
			playersCount: parseNumber(),
		}),
	),
})

export async function getPublicGames() {
	const response = await fetch('/public-games.json')
	const data = await response.json()
	return getPublicGamesRequestParser(data).games
}
