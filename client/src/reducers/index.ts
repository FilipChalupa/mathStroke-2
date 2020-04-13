import { combineReducers } from 'redux'
import { gameReducer, GameState } from './game'
import { lobbyCountdownReducer, LobbyCountdownState } from './lobbyCountdown'
import { playersReducer, PlayersState } from './players'
import { publicGamesReducer, PublicGamesState } from './publicGames'

export interface State {
	game: GameState
	lobbyCountdown: LobbyCountdownState
	players: PlayersState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	game: gameReducer,
	lobbyCountdown: lobbyCountdownReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
})
