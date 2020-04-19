import { BaseAction, actionIds } from '../common'
import { PlayerCommon } from '../../../common/PlayerCommon'

export class Player extends PlayerCommon {
	public setIsSpectating(isSpectating: boolean) {
		this.isSpectating = isSpectating
	}

	public setIsReady(isReady: boolean) {
		this.isReady = isReady
	}
}

// @TODO: don't store classes in store https://medium.com/collaborne-engineering/why-not-to-store-objects-in-redux-7f41243020fc

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
			state.players.forEach((player) => {
				player.setIsReady(false)
			})
			return { ...state, players: [...state.players] }
		}
		case actionIds.PLAYERS_SET_IS_SPECTATING: {
			state.players.forEach((player) => {
				if (player.id === action.payload.playerId) {
					player.setIsSpectating(action.payload.isSpectating)
				}
			})
			return { ...state, players: [...state.players] }
		}
		case actionIds.PLAYERS_SET_IS_READY: {
			state.players.forEach((player) => {
				if (player.id === action.payload.playerId) {
					player.setIsReady(action.payload.isReady)
				}
			})
			return { ...state, players: [...state.players] }
		}
	}
	return state
}
