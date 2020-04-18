import { BaseAction, actionIds } from '../common'

export interface LevelState {
	isSubmittingSolution: boolean
}

const initialState: LevelState = {
	isSubmittingSolution: false,
}

export const levelReducer = (
	state: LevelState = initialState,
	action: BaseAction,
): LevelState => {
	switch (action.type) {
		case actionIds.LEVEL_SUBMIT_SOLUTION_START: {
			return { ...state, isSubmittingSolution: true }
		}
		case actionIds.LEVEL_SOLUTION_ACCEPTED:
		case actionIds.LEVEL_SOLUTION_REJECTED: {
			return { ...state, isSubmittingSolution: false }
		}
		case actionIds.LEVEL_CLEAR: {
			return initialState
		}
	}
	return state
}
