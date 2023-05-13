import { Container } from '@mui/material'
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
			<Container maxWidth="sm">
				<div>Level {levelNumber}</div>
				<div>Shield {shield}</div>
				{tasks.map((task) => (
					<Task key={task.id} task={task} players={players} />
				))}
			</Container>
			<br />
			<br />
			<br />
			<br />
			{player && <PlayerControls onSolution={player.action.sendSolution} />}
		</>
	)
}
