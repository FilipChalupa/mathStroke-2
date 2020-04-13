import { Payload } from './Payload'

export function getGameSocket(gameId: string): Promise<WebSocket> {
	const socket = new WebSocket(
		`${location.protocol.replace('http', 'ws')}//${
			location.host
		}/game/${gameId}.ws`,
	)

	return new Promise((resolve, reject) => {
		const onConnectError = () => {
			console.error("Couldn't connect to websocket.")
			reject()
		}
		socket.addEventListener('error', onConnectError)
		socket.addEventListener('open', () => {
			console.log('on open')
			socket.removeEventListener('error', onConnectError)
			resolve(socket)
		})
	})
}

export function closeGameSocket(socket: WebSocket) {
	socket.close()
}

export function sendToSocket(socket: WebSocket, payload: Payload) {
	socket.send(JSON.stringify(payload))
}
