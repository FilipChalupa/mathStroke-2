import { createClients } from './clients'

export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name
	const clients = createClients()

	return {
		getId,
		getName,
		handleUpgrade: clients.handleUpgrade,
	}
}
