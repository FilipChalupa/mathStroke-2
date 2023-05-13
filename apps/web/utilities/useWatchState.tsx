import { RoomState as RoomStateMessage, ServerWatch } from 'messages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { assertNever } from 'utilities'
import { getTime } from './getTime'

export type WatchState = ReturnType<typeof useWatchState>['state']

type Player = {
	id: string
	name: string
	color: string
	ready: boolean
}

export type Task = {
	type: 'basic'
	id: string
	position: number
	label: string
	createdAt: number
	timeToImpactMilliseconds: number
	destroyed: null | {
		byPlayerId: string | null
		time: number
	}
}

export type RoomState =
	| Exclude<RoomStateMessage, { state: 'level' }>
	| (Extract<RoomStateMessage, { state: 'level' }> & {
			tasks: Task[]
	  })

export const useWatchState = () => {
	const [watchersCount, setWatchersCount] = useState(0)
	const [players, setPlayers] = useState<Player[]>([])
	const [baseRoomState, setBaseRoomState] = useState<RoomStateMessage>({
		state: 'lobby',
		levelNumber: 1,
	})
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		if (baseRoomState.state === 'level') {
			return () => {
				setTasks([])
			}
		}
		setTasks([])
	}, [baseRoomState.state])

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
				setBaseRoomState(message.state)
			} else if (message.type === 'updateShield') {
				setBaseRoomState((baseRoomState) => {
					if (baseRoomState.state !== 'level') {
						return baseRoomState
					}
					return {
						...baseRoomState,
						shield: message.shield,
					}
				})
			} else if (message.type === 'addBasicTask') {
				setTasks((tasks) => [
					...tasks,
					{
						type: 'basic',
						createdAt: getTime(),
						id: message.taskId,
						destroyed: null,
						label: message.label,
						position: message.position,
						timeToImpactMilliseconds: message.timeToImpactMilliseconds,
					},
				])
			} else if (message.type === 'destroyBasicTask') {
				setTasks((tasks) =>
					tasks.map((task) =>
						task.id === message.taskId
							? {
									...task,
									destroyed: {
										time: getTime(),
										byPlayerId: message.byPlayerId,
									},
							  }
							: task,
					),
				)
			} else {
				assertNever(message)
			}
		},
		[
			/* This must stay empty otherwise it will cause reconnects */
		],
	)

	useEffect(() => {
		if (baseRoomState.state === 'lobby') {
			return () => {
				setPlayers((players) =>
					players.map((player) => ({ ...player, ready: false })),
				)
			}
		}
	}, [baseRoomState.state])

	const roomState = useMemo<RoomState>(() => {
		if (baseRoomState.state === 'level') {
			return {
				...baseRoomState,
				tasks,
			}
		}
		return baseRoomState
	}, [baseRoomState, tasks])

	return useMemo(
		() => ({
			handleMessage,
			state: { watchersCount, players, roomState },
		}),
		[handleMessage, players, roomState, watchersCount],
	)
}
