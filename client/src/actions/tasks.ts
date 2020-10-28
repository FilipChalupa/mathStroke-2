import { actionIds, BaseAction } from '../common'
import { Task } from '../reducers/tasks'

export const tasksAddAction = (task: Task): BaseAction => ({
	type: actionIds.TASKS_ADD,
	payload: { task },
})

export const tasksRemoveAction = (id: Task['id']): BaseAction => ({
	type: actionIds.TASKS_REMOVE,
	payload: { id },
})

export const tasksClearAction = (): BaseAction => ({
	type: actionIds.TASKS_CLEAR,
	payload: null,
})
