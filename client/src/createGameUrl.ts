import { routes } from './routes'

export function createGameUrl(gameId: string) {
	return `${routes.game}#${gameId}`
}
