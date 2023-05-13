import type { FunctionComponent } from 'react'
import { Task as TaskType } from '../utilities/useWatchState'

export interface TaskProps {
	task: TaskType
}

export const Task: FunctionComponent<TaskProps> = ({ task }) => {
	return (
		<div>
			{task.type} [{task.id}]: {task.label}
		</div>
	)
}
