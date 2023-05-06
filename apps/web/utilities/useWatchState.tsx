import { RoomState, ServerWatch } from 'messages'
import { useCallback, useMemo, useState } from 'react'
import { assertNever } from 'utilities'

export type WatchState = ReturnType<typeof useWatchState>['state']

export const useWatchState = () => {
	const [watchersCount, setWatchersCount] = useState(0)
	const [players, setPlayers] = useState<
		Array<{
			id: string
			name: string
			color: string
		}>
	>([])
	const [roomState, setRoomState] = useState<RoomState>({
		state: 'lobby',
		levelNumber: 1,
	})

	const handleMessage = useCallback(
		(message: ServerWatch.AnyMessage) => {
			if (message.type === 'updateWatchersCount') {
				setWatchersCount(message.count)
			} else if (message.type === 'addPlayer') {
				setPlayers((players) => [
					...players,
					{
						id: message.id,
						name: message.name,
						color: message.color,
					},
				])
			} else if (message.type === 'removePlayer') {
				setPlayers((players) =>
					players.filter((player) => player.id !== message.id),
				)
			} else if (message.type === 'updatePlayerInformation') {
				setPlayers((players) =>
					players.map((player) =>
						player.id === message.id
							? {
									...player,
									name: message.name,
									color: message.color,
							  }
							: player,
					),
				)
			} else if (message.type === 'updateRoomState') {
				setRoomState(message.state)
			} else {
				assertNever(message)
			}
		},
		[
			/* This must stay empty otherwise it will cause reconnects */
		],
	)

	return useMemo(
		() => ({ handleMessage, state: { watchersCount, players, roomState } }),
		[handleMessage, players, roomState, watchersCount],
	)
}
