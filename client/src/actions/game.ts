import { BaseAction, actionIds } from '../common'
import { GameInfo } from '../reducers/game'

export const gameConnectRequestStartAction = (gameId: string): BaseAction => ({
	type: actionIds.GAME_CONNECT_REQUEST_START,
	payload: { gameId },
})

export const gameConnectRequestCompletedAction = (): BaseAction => ({
	type: actionIds.GAME_CONNECT_REQUEST_COMPLETED,
	payload: null,
})

export const gameConnectRequestFailedAction = (): BaseAction => ({
	type: actionIds.GAME_CONNECT_REQUEST_FAILED,
	payload: null,
})

export const gameDisconnectRequestStartAction = (): BaseAction => ({
	type: actionIds.GAME_DISCONNECT_REQUEST_START,
	payload: null,
})

export const gameDisconnectRequestCompletedAction = (): BaseAction => ({
	type: actionIds.GAME_DISCONNECT_REQUEST_COMPLETED,
	payload: null,
})

export const gameUpdateInfoAction = (
	gameInfo: Partial<GameInfo>,
): BaseAction => ({
	type: actionIds.GAME_UPDATE_INFO,
	payload: { gameInfo },
})
