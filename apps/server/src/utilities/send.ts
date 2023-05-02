import { ServerRooms } from 'messages'
import WebSocket from 'ws'

export const send = (
	webSocket: WebSocket.WebSocket,
	message: ServerRooms.AnyMessage /* @TODO: add other types */,
) => {
	webSocket.send(JSON.stringify(message))
}
