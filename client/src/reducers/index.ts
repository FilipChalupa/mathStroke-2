import { combineReducers } from 'redux'
import {
	numberCollectionReducer,
	NumberCollectionState,
} from './number-collection'
import { PublicGamesState, publicGamesReducer } from './publicGames'
import { playersReducer, PlayersState } from './players'

export interface State {
	numberCollection: NumberCollectionState
	players: PlayersState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	numberCollection: numberCollectionReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
})
