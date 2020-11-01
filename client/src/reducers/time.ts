import { actionIds, BaseAction } from '../common'

export interface TimeState {
	serverOffset: number
}

const initialState: TimeState = {
	serverOffset: 0,
}

export const timeReducer = (
	state: TimeState = initialState,
	action: BaseAction,
): TimeState => {
	switch (action.type) {
		case actionIds.TIME_SET_OFFSET: {
			const serverOffset: number = action.payload.serverOffset
			return { ...state, serverOffset }
		}
	}
	return state
}
