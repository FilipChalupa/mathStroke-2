import type { FunctionComponent } from 'react'
import { assertNever } from 'utilities'
import { Player } from '../utilities/usePlayState'
import { WatchState } from '../utilities/useWatchState'
import { Level } from './Level'
import { Lobby } from './Lobby'

export interface RoomProps {
	watchState: WatchState
	player?: Player
}

export const Room: FunctionComponent<RoomProps> = ({
	watchState: { players, watchersCount, roomState },
	player,
}) => {
	return (
		<>
			{roomState.state === 'level' ? (
				<Level players={players} watchState={roomState} player={player} />
			) : roomState.state === 'lobby' ? (
				<Lobby
					players={players}
					watchersCount={watchersCount}
					watchState={roomState}
					player={player}
				/>
			) : (
				assertNever(roomState)
			)}
		</>
	)
}
