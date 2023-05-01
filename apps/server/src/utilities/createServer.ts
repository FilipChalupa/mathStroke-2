import { AnyClientMessage, AnyServerMessage } from 'messages'
import { createListenable } from 'utilities'
import WebSocket from 'ws'
import { upgradeHandler } from './upgradeHandler'

let lastClientId = 0

const clientLog = (serverName: string, clientId: string, message: string) => {
	console.log(`[${serverName}][${clientId}] ${message}`)
}

const createClient = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
	serverName: string,
	wsClient: WebSocket.WebSocket,
) => {
	const socketEquals = (other: WebSocket.WebSocket) => wsClient === other

	const id = `${++lastClientId}`
	const log = (message: string) => clientLog(serverName, id, message)

	const messagesListener = createListenable<[message: ClientMessage]>()

	wsClient.addEventListener('message', (event) => {
		const data: ClientMessage = JSON.parse(event.data.toString())
		messagesListener.emit(data)
		log(`Message received: ${event.data}`)
	})

	const action = <Message extends ServerMessage>(
		type: Message['type'],
		data: Omit<Message, 'type'>,
	) => {
		wsClient.send(JSON.stringify({ type, ...data }))
	}

	return {
		socketEquals,
		log,
		addMessageListener: messagesListener.addListener,
		removeMessageListener: messagesListener.removeListener,
		action,
	}
}

export const createServer = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
	serverName: string,
) => {
	const ws = new WebSocket.Server({ noServer: true })

	const newClientListener = createListenable<[client: Client]>()

	type Client = ReturnType<typeof createClient<ClientMessage, ServerMessage>>
	let clients: Client[] = []
	const listClients = () => clients

	const handleUpgrade = upgradeHandler(ws, (wsClient) => {
		const client = createClient<ClientMessage, ServerMessage>(
			serverName,
			wsClient,
		)
		clients.push(client)
		newClientListener.emit(client)
		client.log('New client connected.')

		wsClient.addEventListener('close', () => {
			// @TODO
			client.log('Client disconnected.')
			clients = clients.filter((client) => !client.socketEquals(wsClient))
		})
	})

	return {
		handleUpgrade,
		listClients,
		addNewClientListener: newClientListener.addListener,
		removeNewClientListener: newClientListener.removeListener,
	}
}
