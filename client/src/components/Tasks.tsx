import * as React from 'react'
import { useStateSelector } from '../useStateSelector'

export const Tasks: React.FunctionComponent = () => {
	const { tasks } = useStateSelector((state) => state.tasks)

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>{task.instructions}</li>
			))}
		</ul>
	)
}
