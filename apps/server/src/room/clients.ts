import { ClientPlay, ClientWatch, ServerPlay, ServerWatch } from 'messages'
import { Color, assertNever, defaultColor } from 'utilities'
import { createServer } from '../utilities/createServer'
import { createPlayer } from './player'
import { createWatcher } from './watcher'

type Player = ReturnType<typeof createPlayer>
type Watcher = ReturnType<typeof createWatcher>

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

type Client = ClientPlay | ClientWatch

export const createClients = () => {
	const clients: Client[] = []

	const playServer = createPlayServer('play')
	const watchServer = createWatchServer('watch')

	// @TODO: broadcast and send new player information

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
	})

	playServer.addLeftClientListener((client) => {
		const leftIndex = clients.findIndex(
			(other) => other.client.getId() === client.getId(),
		)
		if (leftIndex < 0) {
			throw new Error('Trying to remove a client that does not exist')
		}
		clients.splice(leftIndex, 1)
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

	const broadcastWatcherAction = (action: ServerWatch.AnyMessage) => {
		clients.forEach(({ client, role }) => {
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

	const broadcastWatchersCount = () => {
		broadcastWatcherAction({
			type: 'updateWatchersCount',
			count: clients.filter(({ role }) => role === 'watch').length,
		})
	}

	const handlePlayMessage = (
		client: ClientPlay,
		message: ClientPlay.AnyPlayOnlyMessage,
	) => {
		if (message.type === 'setPlayerInformation') {
			client.name = message.name
			client.color = message.color
			// @TODO: broadcast new player information
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

	return {
		handleUpgrade: {
			play: playServer.handleUpgrade,
			watch: watchServer.handleUpgrade,
		},
	}
}
