import clsx from 'clsx'
import { FunctionComponent, useMemo } from 'react'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import { Progress } from './Progress'
import styles from './Task.module.css'

export interface TaskProps {
	task: TaskType
	players: WatchState['players']
}

export const Task: FunctionComponent<TaskProps> = ({ task, players }) => {
	const destroyedByName = useMemo(() => {
		const byPlayerId = task.destroyed?.byPlayerId
		if (!byPlayerId) {
			return null
		}
		return players.find(({ id }) => id === byPlayerId)?.name ?? <i>Somebody</i>
	}, [players, task.destroyed?.byPlayerId])

	return (
		<div
			className={clsx(styles.wrapper, task.destroyed && styles.is_destroyed)}
		>
			<div className={styles.content}>
				<div className={styles.header}>
					<div className={styles.label}>{task.label}</div>
					{destroyedByName && (
						<div className={styles.destroyer}>{destroyedByName}</div>
					)}
				</div>
				<Progress
					startAt={task.createdAt}
					stoppedAt={task.destroyed?.time}
					duration={task.timeToImpactMilliseconds}
				/>
			</div>
		</div>
	)
}
