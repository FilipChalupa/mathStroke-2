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
			onConnection(wsClient)
		})
	}
}
