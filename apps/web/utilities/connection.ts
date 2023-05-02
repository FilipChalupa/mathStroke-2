import { listenable } from 'custom-listenable'
import {
	AnyClientMessage,
	AnyServerMessage,
	ClientPlay,
	ClientRooms,
	ClientWatch,
	ServerPlay,
	ServerRooms,
	ServerWatch,
} from 'messages'

const createConnection = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
	path: string,
	handleOpen: () => void,
	handleCloseFromServer: () => void,
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

	webSocket.addEventListener('close', (event) => {
		if (shouldBeClosed === false) {
			handleCloseFromServer()
		}
	})

	const close = () => {
		shouldBeClosed = true
		if (webSocket.readyState === WebSocket.OPEN) {
			webSocket.close()
		}
	}

	const messagesListener = listenable<[message: ServerMessage]>()

	webSocket.addEventListener('message', (event) => {
		const data: ServerMessage = JSON.parse(event.data)
		messagesListener.emit(data)
	})

	const action = (message: ClientMessage) => {
		webSocket.send(JSON.stringify(message))
	}

	return {
		close,
		addMessageListener: messagesListener.addListener,
		removeMessageListener: messagesListener.removeListener,
		action,
	}
}

export const createRoomsConnection = (
	handleOpen: () => void,
	handleCloseFromServer: () => void,
) =>
	createConnection<ClientRooms.AnyMessage, ServerRooms.AnyMessage>(
		'/rooms',
		handleOpen,
		handleCloseFromServer,
	)

export const createPlayConnection = (
	roomId: string,
	handleOpen: () => void,
	handleCloseFromServer: () => void,
) =>
	createConnection<ClientPlay.AnyMessage, ServerPlay.AnyMessage>(
		`/play/${roomId}`,
		handleOpen,
		handleCloseFromServer,
	)

export const createWatchConnection = (
	roomId: string,
	handleOpen: () => void,
	handleCloseFromServer: () => void,
) =>
	createConnection<ClientWatch.AnyMessage, ServerWatch.AnyMessage>(
		`/watch/${roomId}`,
		handleOpen,
		handleCloseFromServer,
	)

export type RoomsConnection = ReturnType<typeof createRoomsConnection>
export type PlayConnection = ReturnType<typeof createPlayConnection>
export type WatchConnection = ReturnType<typeof createWatchConnection>
