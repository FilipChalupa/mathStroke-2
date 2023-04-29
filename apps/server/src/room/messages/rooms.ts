import { ServerRooms } from 'messages'
import WebSocket from 'ws'
import { send as sendAny } from '../../utilities/send'

const send = <Message extends ServerRooms.AnyMessage>(
	webSocket: WebSocket.WebSocket,
	message: Message,
) => {
	sendAny(webSocket, message)
}

export const addRoomAnnouncement = (webSocket: WebSocket.WebSocket) => {
	send(webSocket, {
		type: 'add-room-announcement',
	})
}

export const removeRoomAnnouncement = (webSocket: WebSocket.WebSocket) => {
	send(webSocket, {
		type: 'remove-room-announcement',
	})
}
