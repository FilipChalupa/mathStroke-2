import { actionIds, BaseAction } from '../common'

export const timeSetOffset = (serverOffset: number): BaseAction => ({
	type: actionIds.TIME_SET_OFFSET,
	payload: { serverOffset },
})
