import { BaseAction, actionIds } from '../common'
export * from './publicGames'

export const numberRequestStartAction = (): BaseAction => ({
	type: actionIds.GET_NUMBER_REQUEST_START,
	payload: null,
})

export const numberRequestCompletedAction = (
	numberGenerated: number,
): BaseAction => ({
	type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
	payload: numberGenerated,
})
