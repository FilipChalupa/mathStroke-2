import { ReactNode } from 'react'
import { WatchState } from './useWatchState'

export const playerName = (
	players: WatchState['players'],
	playerId: string | null | undefined,
): ReactNode => {
	if (!playerId) {
		return null
	}
	return players.find(({ id }) => id === playerId)?.name ?? <i>Somebody</i>
}
