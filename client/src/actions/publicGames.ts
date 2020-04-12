import { BaseAction, actionIds } from '../common'

export const publicGamesRequestStartAction = (): BaseAction => ({
	type: actionIds.PUBLIC_GAMES_REQUEST_START,
	payload: null,
})

export const publicGamesRequestCompletedAction = (games: any): BaseAction => ({
	type: actionIds.PUBLIC_GAMES_REQUEST_COMPLETED,
	payload: { games },
})
