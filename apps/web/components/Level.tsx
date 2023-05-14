import { Container } from '@mui/material'
import type { FunctionComponent } from 'react'
import { Player } from '../utilities/usePlayState'
import { RoomState, WatchState } from '../utilities/useWatchState'
import { HitConfirmation } from './HitConfirmation'
import styles from './Level.module.css'
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
		<div className={styles.wrapper}>
			{player && (
				<HitConfirmation
					lastHitConfirmationTime={player.state.lastHitConfirmationTime}
					jammed={player.state.jammed}
				/>
			)}
			<div className={styles.field}>
				<Container maxWidth="sm">
					<div>Level {levelNumber}</div>
					<div>Shield {shield}</div>
					{tasks.map((task) => (
						<Task key={task.id} task={task} players={players} />
					))}
				</Container>
			</div>
			{player && (
				<div className={styles.controls}>
					<PlayerControls
						onSolution={player.action.sendSolution}
						waitingForHitConfirmation={player.state.waitingForHitConfirmation}
					/>
				</div>
			)}
		</div>
	)
}
