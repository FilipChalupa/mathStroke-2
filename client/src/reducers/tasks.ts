import { actionIds, BaseAction } from '../common'

export interface Task {
	id: string
	instructions: string
	xPosition: number
}

export interface TasksState {
	tasks: Task[]
}

const initialState: TasksState = {
	tasks: [],
}

export const tasksReducer = (
	state: TasksState = initialState,
	action: BaseAction,
): TasksState => {
	switch (action.type) {
		case actionIds.TASKS_ADD: {
			const task: Task = action.payload.task
			const tasks = state.tasks.concat([task])
			return { ...state, tasks }
		}
		case actionIds.TASKS_REMOVE: {
			const id: Task['id'] = action.payload.id
			return { ...state, tasks: state.tasks.filter((x) => x.id !== id) }
		}
		case actionIds.TASKS_CLEAR: {
			return { ...state, tasks: [] }
		}
	}
	return state
}
