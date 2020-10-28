import { useStateSelector } from './useStateSelector'

export function useLocalPlayer() {
	const players = useStateSelector((state) => state.players.players)
	const localPlayerId = useStateSelector((state) => state.players.localPlayerId)
	if (!localPlayerId) {
		return null
	}
	const localPlayer = players.find((player) => player.id === localPlayerId)
	return localPlayer || null
}
