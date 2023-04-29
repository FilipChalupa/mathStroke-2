export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string) => {
	return { id }
}
