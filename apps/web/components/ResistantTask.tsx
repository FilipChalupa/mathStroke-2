import { CircularProgress } from '@mui/material'
import { FunctionComponent, useMemo } from 'react'
import { playerName } from '../utilities/playerName'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import { TaskBase } from './TaskBase'

export interface ResistantTaskProps {
	task: Extract<TaskType, { type: 'resistant' }>
	players: WatchState['players']
}

export const ResistantTask: FunctionComponent<ResistantTaskProps> = ({
	task,
	players,
}) => {
	const stoppedAt = useMemo(() => {
		if (task.hitBy.length < task.strength) {
			return null
		}
		return task.hitBy[task.strength - 1].time
	}, [task.hitBy, task.strength])
	const lastHitByName = useMemo(
		() => playerName(players, task.hitBy[task.hitBy.length - 1]?.byPlayerId),
		[players, task.hitBy],
	)

	const progress = useMemo(
		() =>
			task.hitBy.filter((hitBy) => hitBy.byPlayerId !== null).length /
			task.strength,
		[task.hitBy, task.strength],
	)

	return (
		<TaskBase
			label={task.label}
			other={
				<CircularProgress
					size={30}
					thickness={10}
					variant="determinate"
					value={progress * 100}
				/>
			}
			createdAt={task.createdAt}
			stoppedAt={stoppedAt}
			timeToImpactMilliseconds={task.timeToImpactMilliseconds}
			destroyedBy={lastHitByName}
		/>
	)
}
