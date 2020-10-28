import * as React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../reducers'

export const Tasks: React.FunctionComponent = () => {
	const { tasks } = useSelector((state: State) => state.tasks)

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>{task.instructions}</li>
			))}
		</ul>
	)
}
