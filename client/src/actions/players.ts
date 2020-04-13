import { BaseAction, actionIds } from '../common'
import { Player } from '../reducers/players'

export const playersAddAction = (player: Player): BaseAction => ({
	type: actionIds.PLAYERS_ADD,
	payload: { player },
})

export const playersRemoveAction = (id: Player['id']): BaseAction => ({
	type: actionIds.PLAYERS_REMOVE,
	payload: { id },
})

export const playersClearAction = (): BaseAction => ({
	type: actionIds.PLAYERS_CLEAR,
	payload: null,
})

export const playersSetLocalPlayerId = (id: Player['id']): BaseAction => ({
	type: actionIds.PLAYERS_SET_LOCAL_PLAYER_ID,
	payload: { id },
})

export const playersSetIsSpectating = (
	playerId: Player['id'],
	isSpectating: Player['isSpectating'],
): BaseAction => ({
	type: actionIds.PLAYERS_SET_IS_SPECTATING,
	payload: { playerId, isSpectating },
})

export const playersSetIsReady = (
	playerId: Player['id'],
	isReady: Player['isReady'],
): BaseAction => ({
	type: actionIds.PLAYERS_SET_IS_READY,
	payload: { playerId, isReady },
})

export const playersClearIsReady = (): BaseAction => ({
	type: actionIds.PLAYERS_CLEAR_IS_READY,
	payload: null,
})

export const playersSetLocalIsSpectating = (
	isSpectating: Player['isSpectating'],
): BaseAction => ({
	type: actionIds.PLAYERS_SET_LOCAL_IS_SPECTATING,
	payload: { isSpectating },
})

export const playersSetLocalIsReady = (
	isReady: Player['isReady'],
): BaseAction => ({
	type: actionIds.PLAYERS_SET_LOCAL_IS_READY,
	payload: { isReady },
})
