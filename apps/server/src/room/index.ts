export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name

	return { getId, getName }
}
