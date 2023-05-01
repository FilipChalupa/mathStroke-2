import { ClientPlay, ClientWatch, ServerPlay, ServerWatch } from 'messages'
import { createServer } from '../utilities/createServer'
export type Room = ReturnType<typeof createRoom>

export const createRoom = (id: string, name: string) => {
	const getId = () => id
	const getName = () => name

	const playServer = createServer<ClientPlay.AnyMessage, ServerPlay.AnyMessage>(
		'play',
	)
	const watchServer = createServer<
		ClientWatch.AnyMessage,
		ServerWatch.AnyMessage
	>('watch')

	return {
		getId,
		getName,
		handlePlayUpgrade: playServer.handleUpgrade,
		handleWatchUpgrade: watchServer.handleUpgrade,
	}
}
