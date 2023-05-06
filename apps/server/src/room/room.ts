import { listenable } from 'custom-listenable'
import { createClients } from './clients'
import { createRoomState } from './roomState'

export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name
	const playerCountListener = listenable<[playerCount: number]>()
	const clients = createClients(playerCountListener.emit)
	const getPlayerCount = () => clients.getPlayerCount()
	const log = (message: string) => {
		console.log(`[room][${id}] ${message}`)
	}
	const roomState = createRoomState(log)

	log('Created')

	return {
		getId,
		getName,
		getPlayerCount,
		addPlayerCountListener: playerCountListener.addListener,
		removePlayerCountListener: playerCountListener.removeListener,
		handleUpgrade: clients.handleUpgrade,
	}
}
