import {
	AnyClientMessage,
	AnyServerMessage,
	ClientRooms,
	ServerRooms,
	createListenable,
} from 'messages'

const createConnection = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
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

	const messagesListener = createListenable<[message: ServerMessage]>()

	webSocket.addEventListener('message', (event) => {
		const data: ServerMessage = JSON.parse(event.data)
		messagesListener.emit(data)
	})

	const action = <Message extends ClientMessage>(
		type: Message['type'],
		data: Omit<Message, 'type'>,
	) => {
		webSocket.send(JSON.stringify({ type, ...data }))
	}

	return {
		close,
		addMessageListener: messagesListener.addListener,
		removeMessageListener: messagesListener.removeListener,
		action,
	}
}

export const createRoomsConnection = (handleOpen: () => void) =>
	createConnection<ClientRooms.AnyMessage, ServerRooms.AnyMessage>(
		'/rooms',
		handleOpen,
	)

export type RoomsConnection = ReturnType<typeof createRoomsConnection>
