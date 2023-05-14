import { RoomState as RoomStateMessage, ServerWatch } from 'messages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Color, assertNever } from 'utilities'
import { getTime } from './getTime'

export type WatchState = ReturnType<typeof useWatchState>['state']

type Player = {
	id: string
	name: string
	color: Color
	ready: boolean
	hitCount: number
	jammedCount: number
}

export type Task = {
	id: string
} & (
	| {
			type: 'basic'
			position: number
			label: string
			createdAt: number
			timeToImpactMilliseconds: number
			destroyed: null | {
				byPlayerId: string | null
				time: number
			}
	  }
	| {
			type: 'resistant'
			position: number
			label: string
			createdAt: number
			strength: number
			timeToImpactMilliseconds: number
			hitBy: Array<{
				byPlayerId: string | null
				time: number
			}>
	  }
)

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
					hitCount: message.hitCount,
					jammedCount: message.jammedCount,
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
											hitCount: message.hitCount,
											jammedCount: message.jammedCount,
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
			} else if (message.type === 'addResistantTask') {
				setTasks((tasks) => [
					...tasks,
					{
						type: 'resistant',
						createdAt: getTime(),
						id: message.taskId,
						hitBy: [],
						label: message.label,
						position: message.position,
						strength: message.strength,
						timeToImpactMilliseconds: message.timeToImpactMilliseconds,
					},
				])
			} else if (message.type === 'hitResistantTask') {
				setTasks((tasks) =>
					tasks.map((task) =>
						task.id === message.taskId && task.type === 'resistant'
							? {
									...task,
									label: message.newLabel,
									hitBy: [
										...task.hitBy,
										{
											time: getTime(),
											byPlayerId: message.byPlayerId,
										},
									],
							  }
							: task,
					),
				)
			} else if (message.type === 'destroyBasicTask') {
				setTasks((tasks) =>
					tasks.map((task) =>
						task.id === message.taskId && task.type === 'basic'
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
		if (baseRoomState.state === 'level') {
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
