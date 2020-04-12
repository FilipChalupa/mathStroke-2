import { BaseAction, actionIds } from '../common'

export interface PublicGamesState {
	loading: boolean
	games: Array<{
		id: string
		name: string
		playersCount: number
	}>
}

const initialState: PublicGamesState = {
	loading: false,
	games: [],
}

export const publicGamesReducer = (
	state: PublicGamesState = initialState,
	action: BaseAction,
) => {
	switch (action.type) {
		case actionIds.PUBLIC_GAMES_REQUEST_START: {
			return { ...state, loading: true }
		}
		case actionIds.PUBLIC_GAMES_REQUEST_COMPLETED: {
			return { ...state, loading: false, games: action.payload.games }
		}
	}
	return state
}
