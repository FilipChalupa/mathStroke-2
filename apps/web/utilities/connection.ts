import { AnyServerMessage, ServerRooms, createListenable } from 'messages'

const createConnection = <Message extends AnyServerMessage = never>(
	path: string,
	handleOpen: () => void,
) => {
	const webSocket = new WebSocket(`ws://localhost:5000${path}`)
	webSocket.addEventListener('open', () => {
		handleOpen()
	})

	const close = () => {
		webSocket.close()
	}

	const messagesListener = createListenable<[message: Message]>()

	webSocket.addEventListener('message', (event) => {
		const data: Message = JSON.parse(event.data)
		messagesListener.emit(data)
	})

	return {
		close,
		addMessageListener: messagesListener.addListener,
		removeMessageListener: messagesListener.removeListener,
	}
}

export const createRoomsConnection = (handleOpen: () => void) =>
	createConnection<ServerRooms.AnyMessage>('/rooms', handleOpen)

export type RoomsConnection = ReturnType<typeof createRoomsConnection>
