import * as React from 'react'
import { useStateSelector } from '../useStateSelector'

export const LobbyCountdown: React.SFC = () => {
	const remainingSeconds = useStateSelector(
		(state) => state.lobbyCountdown.remainingSeconds,
	)

	if (remainingSeconds === null) {
		return null
	}

	return <div>Countdown: {remainingSeconds}</div>
}
