import { FunctionComponent } from 'react'
import { assertNever } from 'utilities'
import { Task as TaskType, WatchState } from '../utilities/useWatchState'
import { BasicTask } from './BasicTask'
import { ResistantTask } from './ResistantTask'

export interface TaskProps {
	task: TaskType
	players: WatchState['players']
}

export const Task: FunctionComponent<TaskProps> = ({ task, players }) => {
	if (task.type === 'basic') {
		return <BasicTask task={task} players={players} />
	} else if (task.type === 'resistant') {
		return <ResistantTask task={task} players={players} />
	} else {
		assertNever(task)
		return null
	}
}
