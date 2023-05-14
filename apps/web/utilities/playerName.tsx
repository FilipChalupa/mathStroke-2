import { ReactNode } from 'react'
import { PlayerName } from '../components/PlayerName'
import { WatchState } from './useWatchState'

export const playerName = (
	players: WatchState['players'],
	playerId: string | null | undefined,
): ReactNode => {
	if (!playerId) {
		return null
	}
	const player = players.find(({ id }) => id === playerId)
	if (player === undefined) {
		return <i>Somebody</i>
	}
	return <PlayerName name={player.name} color={player.color} />
}
