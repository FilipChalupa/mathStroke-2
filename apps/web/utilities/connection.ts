import {
	AnyClientMessage,
	AnyServerMessage,
	ClientRooms,
	ServerRooms,
} from 'messages'
import { createListenable } from 'utilities'

const createConnection = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
	path: string,
	handleOpen: () => void,
) => {
	let shouldBeClosed = false
	const webSocket = new WebSocket(`ws://localhost:5000${path}`)
	webSocket.addEventListener('open', () => {
		if (shouldBeClosed) {
			close()
			return
		}
		handleOpen()
	})

	const close = () => {
		shouldBeClosed = true
		if (webSocket.readyState === WebSocket.OPEN) {
			webSocket.close()
		}
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
