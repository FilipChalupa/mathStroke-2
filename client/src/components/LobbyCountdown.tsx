import * as React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../reducers'

export const LobbyCountdown: React.SFC = () => {
	const remainingSeconds = useSelector(
		(state: State) => state.lobbyCountdown.remainingSeconds,
	)

	if (remainingSeconds === null) {
		return null
	}

	return <div>Countdown: {remainingSeconds}</div>
}
