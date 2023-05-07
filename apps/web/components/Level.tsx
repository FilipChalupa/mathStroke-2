import type { FunctionComponent } from 'react'
import { RoomState } from '../../../packages/messages/utilities/RoomState'
import { WatchState } from '../utilities/useWatchState'

export interface LevelProps {
	players: WatchState['players']
	watchState: Extract<RoomState, { state: 'level' }>
}

export const Level: FunctionComponent<LevelProps> = ({
	players,
	watchState,
}) => {
	return (
		<>
			<div>Level {watchState.levelNumber}</div>
			<div>Shield {watchState.shield}</div>
		</>
	)
}
