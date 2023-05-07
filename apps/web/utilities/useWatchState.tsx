import { RoomState, ServerWatch } from 'messages'
import { useCallback, useMemo, useState } from 'react'
import { assertNever } from 'utilities'

export type WatchState = ReturnType<typeof useWatchState>['state']

type Player = {
	id: string
	name: string
	color: string
	ready: boolean
}

export const useWatchState = () => {
	const [watchersCount, setWatchersCount] = useState(0)
	const [players, setPlayers] = useState<Player[]>([])
	const [roomState, setRoomState] = useState<RoomState>({
		state: 'lobby',
		levelNumber: 1,
	})

	const handleMessage = useCallback(
		(message: ServerWatch.AnyMessage) => {
			if (message.type === 'updateWatchersCount') {
				setWatchersCount(message.count)
			} else if (message.type === 'removePlayer') {
				setPlayers((players) =>
					players.filter((player) => player.id !== message.id),
				)
			} else if (message.type === 'updatePlayerInformation') {
				const player: Player = {
					id: message.id,
					name: message.name,
					color: message.color,
					ready: message.ready,
				}
				setPlayers((players) => {
					const isNew = players.every((other) => other.id !== player.id)
					return isNew
						? [...players, player]
						: players.map((player) =>
								player.id === message.id
									? {
											...player,
											name: message.name,
											color: message.color,
											ready: message.ready,
									  }
									: player,
						  )
				})
			} else if (message.type === 'updateRoomState') {
				setRoomState(message.state)
			} else if (message.type === 'updateShield') {
				setRoomState((roomState) => {
					if (roomState.state !== 'level') {
						return roomState
					}
					return {
						...roomState,
						shield: message.shield,
					}
				})
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
