import { BaseAction, actionIds } from '../common'

export const levelSubmitSolutionStartAction = (
	solution: string,
): BaseAction => ({
	type: actionIds.LEVEL_SUBMIT_SOLUTION_START,
	payload: { solution },
})

export const levelSolutionAcceptedAction = (cooldown: number): BaseAction => ({
	type: actionIds.LEVEL_SOLUTION_ACCEPTED,
	payload: { cooldown },
})

export const levelSolutionRejectedAction = (cooldown: number): BaseAction => ({
	type: actionIds.LEVEL_SOLUTION_REJECTED,
	payload: { cooldown },
})

export const levelClearCooldownAction = (): BaseAction => ({
	type: actionIds.LEVEL_CLEAR_COOLDOWN,
	payload: null,
})

export const levelClearAction = (): BaseAction => ({
	type: actionIds.LEVEL_CLEAR,
	payload: null,
})
