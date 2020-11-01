import * as React from 'react'
import { Task } from '../reducers/tasks'
import { useStateSelector } from '../useStateSelector'
import './tasks.css'

export const Tasks: React.FunctionComponent = () => {
	const { tasks } = useStateSelector((state) => state.tasks)

	return (
		<div className="tasks">
			{tasks.map((task) => (
				<TasksItem key={task.id} task={task} />
			))}
		</div>
	)
}

const TasksItem: React.FunctionComponent<{ task: Task }> = ({ task }) => {
	return (
		<div
			className="tasks-item"
			style={{
				['--tasks-x' as any]: task.xPosition,
			}}
		>
			<div className="tasks-item-in">
				<div className="tasks-image"></div>
				<div className="tasks-instructions">{task.instructions}</div>
			</div>
		</div>
	)
}
