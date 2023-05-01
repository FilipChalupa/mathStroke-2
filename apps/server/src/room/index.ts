import { ClientPlay, ClientWatch, ServerPlay, ServerWatch } from 'messages'
import { createServer } from '../utilities/createServer'
import { createPlayer } from './player'
import { createWatcher } from './watcher'

export type Room = ReturnType<typeof createRoom>
type Player = ReturnType<typeof createPlayer>
type Watcher = ReturnType<typeof createWatcher>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name
	const players: Player[] = []
	const watchers: Watcher[] = []

	const playServer = createServer<ClientPlay.AnyMessage, ServerPlay.AnyMessage>(
		'play',
	)
	const watchServer = createServer<
		ClientWatch.AnyMessage,
		ServerWatch.AnyMessage
	>('watch')
	watchServer.addNewClientListener((client) => {
		const addedWatcher = createWatcher(client)
		watchers.push(addedWatcher)
		watchers.forEach((watcher) => {
			watcher.client.action({
				type: 'addWatcherAnnouncement',
				id: addedWatcher.client.getId(),
			})
		})
	})
	watchServer.addLeftClientListener((client) => {
		const leftWatcherIndex = watchers.findIndex(
			(watcher) => watcher.client.getId() === client.getId(),
		)
		if (leftWatcherIndex < 0) {
			throw new Error('Trying to remove a watcher that does not exist')
		}
		const removedWatcher = watchers[leftWatcherIndex]
		watchers.splice(leftWatcherIndex, 1)
		watchers.forEach((watcher) => {
			watcher.client.action({
				type: 'leftWatcherAnnouncement',
				id: removedWatcher.client.getId(),
			})
		})
	})

	return {
		getId,
		getName,
		handlePlayUpgrade: playServer.handleUpgrade,
		handleWatchUpgrade: watchServer.handleUpgrade,
	}
}
