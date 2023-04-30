import { ServerRooms } from 'messages'
import WebSocket from 'ws'
import { Room } from '..'
import { send as sendAny } from '../../utilities/send'

const send = <Message extends ServerRooms.AnyMessage>(
	webSocket: WebSocket.WebSocket,
	message: Message,
) => {
	sendAny(webSocket, message)
}

export const addRoomAnnouncement = (
	webSocket: WebSocket.WebSocket,
	room: Room,
) => {
	send(webSocket, {
		type: 'addRoomAnnouncement',
		id: room.getId(),
		name: room.getName(),
	})
}

export const removeRoomAnnouncement = (
	webSocket: WebSocket.WebSocket,
	room: Room,
) => {
	send(webSocket, {
		type: 'removeRoomAnnouncement',
		id: room.getId(),
	})
}
