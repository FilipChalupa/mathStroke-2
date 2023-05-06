import { listenable } from 'custom-listenable'
import {
	ClientPlay,
	ClientWatch,
	RoomState,
	ServerPlay,
	ServerWatch,
} from 'messages'
import { Color, assertNever, defaultColor } from 'utilities'
import { createServer } from '../utilities/createServer'

const createPlayServer = createServer<
	ClientPlay.AnyMessage,
	ServerPlay.AnyMessage
>
const createWatchServer = createServer<
	ClientWatch.AnyMessage,
	ServerWatch.AnyMessage
>

type ClientPlay = {
	role: 'play'
	client: ReturnType<ReturnType<typeof createPlayServer>['listClients']>[number]
	name: string
	color: Color
}
type ClientWatch = {
	role: 'watch'
	client: ReturnType<
		ReturnType<typeof createWatchServer>['listClients']
	>[number]
}

export type Client = ClientPlay | ClientWatch

export const createClients = (
	onPlayerCountChange: (newCount: number) => void,
) => {
	const clients: Client[] = []

	const playServer = createPlayServer('play')
	const watchServer = createWatchServer('watch')

	const newClientListener = listenable<[client: Client]>()

	const handleNewClient = (client: Client) => {
		sendWatchAction(client, createWatchersCountAction())
		sendAllPlayers(client)
		newClientListener.emit(client)
	}

	playServer.addNewClientListener((client) => {
		const newClient = {
			client,
			role: 'play',
			name: '',
			color: defaultColor,
		} as const
		clients.push(newClient)
		client.addMessageListener((message) => {
			if (message.role === 'play') {
				handlePlayMessage(newClient, message)
			} else if (message.role === 'watch') {
				handleWatchMessage(newClient, message)
			} else {
				assertNever(message)
			}
		})
		broadcastWatcherAction(
			{
				type: 'addPlayer',
				id: client.getId(),
				name: newClient.name,
				color: newClient.color,
			},
			newClient,
		)
		onPlayerCountChange(getPlayerCount())
		handleNewClient(newClient)
	})

	playServer.addLeftClientListener((client) => {
		const leftIndex = clients.findIndex(
			(other) => other.client.getId() === client.getId(),
		)
		if (leftIndex < 0) {
			throw new Error('Trying to remove a client that does not exist')
		}
		clients.splice(leftIndex, 1)
		broadcastWatcherAction({
			type: 'removePlayer',
			id: client.getId(),
		})
		onPlayerCountChange(getPlayerCount())
	})

	watchServer.addNewClientListener((client) => {
		const newClient = {
			client,
			role: 'watch',
		} as const
		clients.push(newClient)
		client.addMessageListener((message) => {
			handleWatchMessage(newClient, message)
		})

		broadcastWatchersCount()
		sendAllPlayers(newClient)
		handleNewClient(newClient)
	})

	watchServer.addLeftClientListener((client) => {
		const leftIndex = clients.findIndex(
			(other) => other.client.getId() === client.getId(),
		)
		if (leftIndex < 0) {
			throw new Error('Trying to remove a client that does not exist')
		}
		clients.splice(leftIndex, 1)

		broadcastWatchersCount()
	})

	const broadcastWatcherAction = (
		action: ServerWatch.AnyMessage,
		excludeClient?: Client,
	) => {
		clients.forEach(({ client, role }) => {
			if (client.getId() === excludeClient?.client.getId()) {
				return
			}
			if (role === 'watch') {
				client.action(action)
			} else if (role === 'play') {
				client.action({
					role: 'watch',
					...action,
				})
			} else {
				assertNever(client)
			}
		})
	}

	const createWatchersCountAction = (): ServerWatch.UpdateWatchersCount => ({
		type: 'updateWatchersCount',
		count: clients.filter(({ role }) => role === 'watch').length,
	})

	const broadcastWatchersCount = () => {
		broadcastWatcherAction(createWatchersCountAction())
	}

	const sendWatchAction = (client: Client, action: ServerWatch.AnyMessage) => {
		if (client.role === 'watch') {
			client.client.action(action)
		} else if (client.role === 'play') {
			client.client.action({
				role: 'watch',
				...action,
			})
		} else {
			assertNever(client)
		}
	}

	const sendAllPlayers = (client: Client) => {
		clients.forEach((other) => {
			if (other.role === 'play') {
				client.client.action({
					role: 'watch',
					type: 'addPlayer',
					id: other.client.getId(),
					name: other.name,
					color: other.color,
				})
			}
		})
	}

	const updateRoomState = (state: RoomState, client?: Client) => {
		const recipients = client ? [client] : clients
		recipients.forEach((other) => {
			sendWatchAction(other, {
				type: 'updateRoomState',
				state,
			})
		})
	}

	const handlePlayMessage = (
		client: ClientPlay,
		message: ClientPlay.AnyPlayOnlyMessage,
	) => {
		if (message.type === 'setPlayerInformation') {
			client.name = message.name.trim()
			client.color = message.color
			broadcastWatcherAction({
				type: 'updatePlayerInformation',
				id: client.client.getId(),
				name: client.name,
				color: client.color,
			})
		} else {
			assertNever(message.type)
		}
	}
	const handleWatchMessage = (
		client: Client,
		message: ClientWatch.AnyMessage,
	) => {
		// @TODO
	}

	const getPlayerCount = () =>
		clients.filter(({ role }) => role === 'play').length

	return {
		getPlayerCount,
		actions: {
			updateRoomState,
		},
		newClient: {
			addListener: newClientListener.addListener,
			removeListener: newClientListener.removeListener,
		},
		handleUpgrade: {
			play: playServer.handleUpgrade,
			watch: watchServer.handleUpgrade,
		},
	}
}
