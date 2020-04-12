import { combineReducers } from 'redux'
import { GameState, gameReducer } from './game'
import { playersReducer, PlayersState } from './players'
import { publicGamesReducer, PublicGamesState } from './publicGames'

export interface State {
	game: GameState
	players: PlayersState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	game: gameReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
})
