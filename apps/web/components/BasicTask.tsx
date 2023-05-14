import { FunctionComponent, useMemo } from 'react'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import styles from './BasicTask.module.css'
import { Progress } from './Progress'
import { TaskWrapper } from './TaskWrapper'

export interface BasicTaskProps {
	task: Extract<TaskType, { type: 'basic' }>
	players: WatchState['players']
}

export const BasicTask: FunctionComponent<BasicTaskProps> = ({
	task,
	players,
}) => {
	const destroyedByName = useMemo(() => {
		const byPlayerId = task.destroyed?.byPlayerId
		if (!byPlayerId) {
			return null
		}
		return players.find(({ id }) => id === byPlayerId)?.name ?? <i>Somebody</i>
	}, [players, task.destroyed?.byPlayerId])

	return (
		<TaskWrapper isDestroyed={Boolean(task.destroyed)}>
			<div className={styles.wrapper}>
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
		</TaskWrapper>
	)
}
