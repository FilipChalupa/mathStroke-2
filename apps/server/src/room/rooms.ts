import { Room, createRoom as createStandaloneRoom } from './'

export type Rooms = ReturnType<typeof createRooms>

export const createRooms = () => {
	const rooms: Room[] = []

	const create = () => {
		const id = `${Math.round(Math.random())}` // @TODO: smarter generator a wrapped type
		const room = createStandaloneRoom(id)
		rooms.push(room)
	}

	const findById = (id: string) => rooms.find((room) => room.id === id) ?? null

	return {
		create,
		findById,
	}
}
