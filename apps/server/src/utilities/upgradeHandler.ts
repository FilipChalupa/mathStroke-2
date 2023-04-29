import http from 'http'
import { Duplex } from 'stream'
import WebSocket from 'ws'

export const upgradeHandler = (
	wsServer: WebSocket.Server,
	onConnection: (wsClient: WebSocket.WebSocket) => void,
) => {
	return (request: http.IncomingMessage, socket: Duplex, head: Buffer) => {
		wsServer.handleUpgrade(request, socket, head, (wsClient) => {
			wsServer.emit('connection', wsClient, request)
			// @TODO: Messages not sent immediately are not received by the client. Figure that out and remove the timeout delay.
			setTimeout(() => {
				onConnection(wsClient)
			}, 1000)
		})
	}
}
