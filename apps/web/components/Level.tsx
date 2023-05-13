import type { FunctionComponent } from 'react'
import { RoomState } from '../../../packages/messages/utilities/RoomState'
import { Player } from '../utilities/usePlayState'
import { WatchState } from '../utilities/useWatchState'
import { PlayerControls } from './PlayerControls'

export interface LevelProps {
	players: WatchState['players']
	watchState: Extract<RoomState, { state: 'level' }>
	player?: Player
}

export const Level: FunctionComponent<LevelProps> = ({
	players,
	watchState,
	player,
}) => {
	return (
		<>
			<div>Level {watchState.levelNumber}</div>
			<div>Shield {watchState.shield}</div>
			{player && <PlayerControls onSolution={player.action.sendSolution} />}
		</>
	)
}
