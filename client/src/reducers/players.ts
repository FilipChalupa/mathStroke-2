import { BaseAction, actionIds } from '../common'

export interface Player {
	id: string
	isSpectating: boolean
	isReady: boolean
	name: string
}

export interface PlayersState {
	players: Player[]
}

const initialState: PlayersState = {
	players: [],
}

export const playersReducer = (
	state: PlayersState = initialState,
	action: BaseAction,
): PlayersState => {
	switch (action.type) {
		case actionIds.PLAYERS_ADD: {
			const player: Player = action.payload.player
			const players = state.players.concat([player])
			return { ...state, players }
		}
		case actionIds.PLAYERS_REMOVE: {
			const id: Player['id'] = action.payload.id
			const players = state.players.filter((x) => x.id !== id)
			return { ...state, players }
		}
		case actionIds.PLAYERS_CLEAR: {
			return { ...state, players: [] }
		}
	}
	return state
}
