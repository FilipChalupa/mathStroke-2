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
	ready: boolean
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
		if (client.role === 'play') {
			client.client.action({
				role: 'play',
				type: 'setId',
				id: client.client.getId(),
			})
		}
		newClientListener.emit(client)
	}

	playServer.addNewClientListener((client) => {
		const newClient: ClientPlay = {
			client,
			role: 'play',
			name: '',
			color: defaultColor,
			ready: false,
		}
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
			createUpdatePlayerInformationAction(newClient),
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

	const createUpdatePlayerInformationAction = (
		client: ClientPlay,
	): ServerWatch.UpdatePlayerInformation => ({
		type: 'updatePlayerInformation',
		id: client.client.getId(),
		name: client.name,
		color: client.color,
		ready: client.ready,
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
					...createUpdatePlayerInformationAction(other),
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

	const updateShield = (shield: number) => {
		clients.forEach((client) => {
			sendWatchAction(client, {
				type: 'updateShield',
				shield,
			})
		})
	}

	const resetReadiness = () => {
		clients.forEach((client) => {
			if (client.role === 'play') {
				client.ready = false
				broadcastWatcherAction(createUpdatePlayerInformationAction(client))
			}
		})
		handleReadinessChange()
	}

	const handleReadinessChange = () => {
		const players = clients.filter(
			(client): client is ClientPlay => client.role === 'play',
		)
		const ready = players.filter((client) => client.ready).length
		const total = players.length
		readinessChangeListener.emit({
			ready,
			total,
		})
	}

	const readinessChangeListener = listenable<
		[
			{
				ready: number
				total: number
			},
		]
	>()

	const handlePlayMessage = (
		client: ClientPlay,
		message: ClientPlay.AnyPlayOnlyMessage,
	) => {
		if (message.type === 'setPlayerInformation') {
			client.name = message.name.trim()
			client.color = message.color
			broadcastWatcherAction(createUpdatePlayerInformationAction(client))
		} else if (message.type === 'setReady') {
			client.ready = message.ready
			broadcastWatcherAction(createUpdatePlayerInformationAction(client))
			handleReadinessChange()
		} else {
			assertNever(message)
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
			updateShield,
			resetReadiness,
		},
		readiness: {
			addListener: readinessChangeListener.addListener,
			removeListener: readinessChangeListener.removeListener,
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
