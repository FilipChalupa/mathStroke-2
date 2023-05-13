import type { FunctionComponent } from 'react'
import { Player } from '../utilities/usePlayState'
import { RoomState, WatchState } from '../utilities/useWatchState'
import { PlayerControls } from './PlayerControls'
import { Task } from './Task'

export interface LevelProps {
	players: WatchState['players']
	watchState: Extract<RoomState, { state: 'level' }>
	player?: Player
}

export const Level: FunctionComponent<LevelProps> = ({
	players,
	watchState: { tasks, levelNumber, shield },
	player,
}) => {
	return (
		<>
			<div>Level {levelNumber}</div>
			<div>Shield {shield}</div>
			{tasks.map((task) => (
				<Task key={task.id} task={task} />
			))}
			<pre>{JSON.stringify(tasks, null, 2)}</pre>
			{player && <PlayerControls onSolution={player.action.sendSolution} />}
		</>
	)
}
