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
