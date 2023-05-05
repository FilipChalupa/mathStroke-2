import { listenable } from 'custom-listenable'
import { generateRoomId } from '../utilities/generateRoomId'
import { Room, createRoom as createStandaloneRoom } from './'

export type Rooms = ReturnType<typeof createRooms>

export const createRooms = () => {
	const rooms: Room[] = []

	const create = (name: string) => {
		const id = generateRoomId()
		const room = createStandaloneRoom(id, name.trim())
		rooms.push(room)
		newRoomListener.emit(room)
	}

	const newRoomListener = listenable<[room: Room]>()

	const findById = (id: string) =>
		rooms.find((room) => room.getId() === id) ?? null

	const listAll = () => rooms

	// @TODO: assure at least one room exists
	setTimeout(() => {
		create('Test room')
	}, 100)

	return {
		create,
		findById,
		listAll,
		addNewRoomListener: newRoomListener.addListener,
		removeNewRoomListener: newRoomListener.removeListener,
	}
}
