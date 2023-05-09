import { listenable } from 'custom-listenable'
import { AnyClientMessage, AnyServerMessage } from 'messages'
import WebSocket from 'ws'
import { upgradeHandler } from './upgradeHandler'

let lastClientId = 0

const clientLog = (serverName: string, clientId: string, message: string) => {
	console.log(`[client:${serverName}][${clientId}] ${message}`)
}

const createClient = <
	ClientMessage extends AnyClientMessage = never,
	ServerMessage extends AnyServerMessage = never,
>(
	serverName: string,
	wsClient: WebSocket.WebSocket,
) => {
	const id = `${++lastClientId}`
	const getId = () => id
	const log = (message: string) => clientLog(serverName, id, message)

	const messagesListener = listenable<[message: ClientMessage]>()

	wsClient.addEventListener('message', (event) => {
		const data: ClientMessage = JSON.parse(event.data.toString())
		messagesListener.emit(data)
	})

	const action = (message: ServerMessage) => {
		wsClient.send(JSON.stringify(message))
	}

	return {
		getId,
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

	const newClientListener = listenable<[client: Client]>()
	const leftClientListener = listenable<[client: Client]>()

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
			client.log('Client disconnected.')
			clients = clients.filter(
				(otherClient) => client.getId() !== otherClient.getId(),
			)
			leftClientListener.emit(client)
		})
	})

	return {
		handleUpgrade,
		listClients,
		addNewClientListener: newClientListener.addListener,
		removeNewClientListener: newClientListener.removeListener,
		addLeftClientListener: leftClientListener.addListener,
		removeLeftClientListener: leftClientListener.removeListener,
	}
}
