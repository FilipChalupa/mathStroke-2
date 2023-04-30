import { createListenable } from 'utilities'
import { Room, createRoom as createStandaloneRoom } from './'

export type Rooms = ReturnType<typeof createRooms>

let lastRoomId = 0

export const createRooms = () => {
	const rooms: Room[] = []

	const create = (name: string) => {
		const id = `${++lastRoomId}` // @TODO: smarter generator a wrapped type
		const room = createStandaloneRoom(id, name)
		rooms.push(room)
		newRoomListener.emit(room)
	}

	const newRoomListener = createListenable<[room: Room]>()

	const findById = (id: string) =>
		rooms.find((room) => room.getId() === id) ?? null

	const listAll = () => rooms

	// @TODO: assure at least one room exists
	create('Barbucha')

	return {
		create,
		findById,
		listAll,
		addNewRoomListener: newRoomListener.addListener,
		removeNewRoomListener: newRoomListener.removeListener,
	}
}
