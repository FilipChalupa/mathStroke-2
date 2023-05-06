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
			<pre>State: {JSON.stringify(roomState)}</pre>
			{roomState.state === 'level' ? (
				<Level />
			) : roomState.state === 'lobby' ? (
				<Lobby players={players} watchersCount={watchersCount} />
			) : (
				assertNever(roomState)
			)}
		</>
	)
}
