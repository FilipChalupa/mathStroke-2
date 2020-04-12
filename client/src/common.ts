export const actionIds = {
	GET_NUMBER_REQUEST_START:
		'[0] Request a new number to the NumberGenerator async service.',
	GET_NUMBER_REQUEST_COMPLETED:
		'[1] NumberGenerator async service returned a new number.',

	PUBLIC_GAMES_REQUEST_START: 'PUBLIC_GAMES_REQUEST_START',
	PUBLIC_GAMES_REQUEST_COMPLETED: 'PUBLIC_GAMES_REQUEST_COMPLETED',

	PLAYERS_ADD: 'PLAYERS_ADD',
	PLAYERS_REMOVE: 'PLAYERS_REMOVE',
	PLAYERS_CLEAR: 'PLAYERS_CLEAR',
}

export interface BaseAction {
	type: string
	payload?: any
}
