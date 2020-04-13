import { useSelector } from 'react-redux'
import { State } from './reducers'

export function useLocalPlayer() {
	const players = useSelector((state: State) => state.players.players)
	const localPlayerId = useSelector(
		(state: State) => state.players.localPlayerId,
	)
	if (!localPlayerId) {
		return null
	}
	const localPlayer = players.find((player) => player.id === localPlayerId)
	return localPlayer || null
}
