import { BaseAction, actionIds } from '../common'

export interface Player {
	id: string
	isSpectating: boolean
	isReady: boolean
	name: string
}

export interface PlayersState {
	players: Player[]
	localPlayerId: null | Player['id']
}

const initialState: PlayersState = {
	players: [],
	localPlayerId: null,
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
		case actionIds.PLAYERS_SET_LOCAL_PLAYER_ID: {
			return { ...state, localPlayerId: action.payload.id }
		}
		case actionIds.PLAYERS_SET_LOCAL_PLAYER_ID: {
			return { ...state, localPlayerId: action.payload.id }
		}
		case actionIds.PLAYERS_CLEAR_IS_READY: {
			return {
				...state,
				players: state.players.map((player) => ({
					...player,
					isReady: false,
				})),
			}
		}
		case actionIds.PLAYERS_SET_IS_SPECTATING: {
			return {
				...state,
				players: state.players.map((player) =>
					player.id !== action.payload.playerId
						? player
						: {
								...player,
								isSpectating: action.payload.isSpectating,
						  },
				),
			}
		}
		case actionIds.PLAYERS_SET_IS_READY: {
			return {
				...state,
				players: state.players.map((player) =>
					player.id !== action.payload.playerId
						? player
						: {
								...player,
								isReady: action.payload.isReady,
						  },
				),
			}
		}
	}
	return state
}
