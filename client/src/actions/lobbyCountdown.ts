import { BaseAction, actionIds } from '../common'

export const lobbyCountdownStartCountdownAction = (
	remainingTime: number,
): BaseAction => ({
	type: actionIds.LOBBY_COUNTDOWN_START_COUNTDOWN,
	payload: { remainingTime },
})

export const lobbyCountdownSetRemainingSecondsCountdownAction = (
	remainingSeconds: number,
): BaseAction => ({
	type: actionIds.LOBBY_COUNTDOWN_SET_REMAINING_SECONDS,
	payload: { remainingSeconds },
})

export const lobbyCountdownStopCountdownAction = (): BaseAction => ({
	type: actionIds.LOBBY_COUNTDOWN_STOP_COUNTDOWN,
	payload: null,
})
