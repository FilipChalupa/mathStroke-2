import { listenable } from 'custom-listenable'
import { createClients } from './clients'

export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name
	const playerCountListener = listenable<[playerCount: number]>()
	const clients = createClients(playerCountListener.emit)
	const getPlayerCount = () => clients.getPlayerCount()

	return {
		getId,
		getName,
		getPlayerCount,
		addPlayerCountListener: playerCountListener.addListener,
		removePlayerCountListener: playerCountListener.removeListener,
		handleUpgrade: clients.handleUpgrade,
	}
}
