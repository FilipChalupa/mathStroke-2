import { BaseAction, actionIds } from '../common'

export interface LobbyCountdownState {
	remainingSeconds: null | number
}

const initialState: LobbyCountdownState = {
	remainingSeconds: null,
}

export const lobbyCountdownReducer = (
	state: LobbyCountdownState = initialState,
	action: BaseAction,
): LobbyCountdownState => {
	switch (action.type) {
		case actionIds.LOBBY_COUNTDOWN_SET_REMAINING_SECONDS: {
			return {
				...state,
				remainingSeconds: action.payload.remainingSeconds,
			}
		}
		case actionIds.LOBBY_COUNTDOWN_STOP_COUNTDOWN: {
			return {
				...state,
				remainingSeconds: null,
			}
		}
	}
	return state
}
