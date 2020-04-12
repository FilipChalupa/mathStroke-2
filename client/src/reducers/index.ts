import { combineReducers } from 'redux'
import { GameState, gameReducer } from './game'
import {
	numberCollectionReducer,
	NumberCollectionState,
} from './number-collection'
import { playersReducer, PlayersState } from './players'
import { publicGamesReducer, PublicGamesState } from './publicGames'

export interface State {
	game: GameState
	numberCollection: NumberCollectionState
	players: PlayersState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	game: gameReducer,
	numberCollection: numberCollectionReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
})
