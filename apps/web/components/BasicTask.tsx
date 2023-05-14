import { FunctionComponent, useMemo } from 'react'
import { playerName } from '../utilities/playerName'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import { TaskBase } from './TaskBase'

export interface BasicTaskProps {
	task: Extract<TaskType, { type: 'basic' }>
	players: WatchState['players']
}

export const BasicTask: FunctionComponent<BasicTaskProps> = ({
	task,
	players,
}) => {
	const destroyedByName = useMemo(
		() => playerName(players, task.destroyed?.byPlayerId),

		[players, task.destroyed?.byPlayerId],
	)

	return (
		<TaskBase
			label={task.label}
			createdAt={task.createdAt}
			stoppedAt={task.destroyed?.time ?? null}
			timeToImpactMilliseconds={task.timeToImpactMilliseconds}
			destroyedBy={destroyedByName}
		/>
	)
}
