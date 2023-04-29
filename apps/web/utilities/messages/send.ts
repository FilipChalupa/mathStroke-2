import { ClientRooms } from 'messages'

export const send = (
	webSocket: WebSocket,
	message: ClientRooms.AnyClientMessage /* @TODO: add other types */,
) => {
	webSocket.send(JSON.stringify(message))
}
