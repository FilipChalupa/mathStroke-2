import type { FunctionComponent } from 'react'
import { Task as TaskType } from '../utilities/useWatchState'
import { Progress } from './Progress'

export interface TaskProps {
	task: TaskType
}

export const Task: FunctionComponent<TaskProps> = ({ task }) => {
	return (
		<div>
			{task.type} [{task.id}]: {task.label}
			{!task.destroyed && (
				<Progress
					startAt={task.createdAt}
					duration={task.timeToImpactMilliseconds}
				/>
			)}
			{task.destroyed && (
				<div>
					Destroyed{' '}
					{task.destroyed.byPlayerId && <>by {task.destroyed.byPlayerId}</>}
				</div>
			)}
		</div>
	)
}
