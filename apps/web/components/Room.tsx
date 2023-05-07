import type { FunctionComponent } from 'react'
import { assertNever } from 'utilities'
import { WatchState } from '../utilities/useWatchState'
import { Level } from './Level'
import { Lobby } from './Lobby'

export interface RoomProps {
	watchState: WatchState
}

export const Room: FunctionComponent<RoomProps> = ({
	watchState: { players, watchersCount, roomState },
}) => {
	return (
		<>
			{roomState.state === 'level' ? (
				<Level players={players} watchState={roomState} />
			) : roomState.state === 'lobby' ? (
				<Lobby
					players={players}
					watchersCount={watchersCount}
					watchState={roomState}
				/>
			) : (
				assertNever(roomState)
			)}
		</>
	)
}
