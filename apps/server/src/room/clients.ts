import { ClientPlay, ClientWatch, ServerPlay, ServerWatch } from 'messages'
import { assertNever } from 'utilities'
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

type Client =
	| {
			role: 'play'
			client: ReturnType<
				ReturnType<typeof createPlayServer>['listClients']
			>[number]
	  }
	| {
			role: 'watch'
			client: ReturnType<
				ReturnType<typeof createWatchServer>['listClients']
			>[number]
	  }

export const createClients = () => {
	const clients: Client[] = []

	const playServer = createPlayServer('play')
	const watchServer = createWatchServer('watch')

	playServer.addNewClientListener((client) => {
		clients.push({
			client,
			role: 'play',
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
		clients.push({
			client,
			role: 'watch',
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

	return {
		handleUpgrade: {
			play: playServer.handleUpgrade,
			watch: watchServer.handleUpgrade,
		},
	}
}
