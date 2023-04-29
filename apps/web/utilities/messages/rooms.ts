import { ClientRooms } from 'messages'
import { send as sendAny } from './send'

const send = <Message extends ClientRooms.AnyMessage>(
	webSocket: WebSocket,
	message: Message,
) => {
	sendAny(webSocket, message)
}

export const requestNewRoom = (webSocket: WebSocket) => {
	send(webSocket, {
		type: 'request-new-room',
	})
}
