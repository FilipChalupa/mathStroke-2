import { BaseAction, actionIds } from '../common'

export interface GameInfo {
	name: string
	state: 'lobby' | 'level'
}

export interface GameState {
	isLoading: boolean
	isConnected: boolean
	gameInfo: GameInfo | null
}

const initialState: GameState = {
	isLoading: false,
	isConnected: false,
	gameInfo: null,
}

export const gameReducer = (
	state: GameState = initialState,
	action: BaseAction,
): GameState => {
	switch (action.type) {
		case actionIds.GAME_CONNECT_REQUEST_START: {
			return { ...state, isLoading: true }
		}
		case actionIds.GAME_CONNECT_REQUEST_COMPLETED: {
			return {
				...state,
				isLoading: false,
				isConnected: true,
			}
		}
		case actionIds.GAME_CONNECT_REQUEST_FAILED: {
			return {
				...state,
				isLoading: false,
				isConnected: false,
			}
		}
		case actionIds.GAME_DISCONNECT_REQUEST_COMPLETED: {
			return {
				...state,
				isLoading: false,
				isConnected: false,
			}
		}
		case actionIds.GAME_UPDATE_INFO: {
			return {
				...state,
				gameInfo: {
					...state.gameInfo,
					...action.payload.gameInfo,
				},
			}
		}
	}
	return state
}
