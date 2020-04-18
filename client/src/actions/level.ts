import { BaseAction, actionIds } from '../common'

export const levelSubmitSolutionStartAction = (
	solution: string,
): BaseAction => ({
	type: actionIds.LEVEL_SUBMIT_SOLUTION_START,
	payload: { solution },
})

export const levelSolutionAcceptedAction = (): BaseAction => ({
	type: actionIds.LEVEL_SOLUTION_ACCEPTED,
	payload: null,
})

export const levelSolutionRejectedAction = (): BaseAction => ({
	type: actionIds.LEVEL_SOLUTION_REJECTED,
	payload: null,
})

export const levelClearAction = (): BaseAction => ({
	type: actionIds.LEVEL_CLEAR,
	payload: null,
})
