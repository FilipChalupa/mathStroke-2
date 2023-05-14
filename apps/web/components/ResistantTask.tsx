import clsx from 'clsx'
import { FunctionComponent } from 'react'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import styles from './ResistantTask.module.css'
import { TaskWrapper } from './TaskWrapper'

export interface ResistantTaskProps {
	task: Extract<TaskType, { type: 'resistant' }>
	players: WatchState['players']
}

export const ResistantTask: FunctionComponent<ResistantTaskProps> = ({
	task,
	players,
}) => {
	return (
		<TaskWrapper isDestroyed={task.hitBy.length >= task.strength}>
			<div className={clsx(styles.wrapper)}>{task.label}</div>
		</TaskWrapper>
	)
}
