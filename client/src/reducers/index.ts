import { combineReducers } from 'redux'
import {
	numberCollectionReducer,
	NumberCollectionState,
} from './number-collection'
import { PublicGamesState, publicGamesReducer } from './publicGames'

export interface State {
	numberCollection: NumberCollectionState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	numberCollection: numberCollectionReducer,
	publicGames: publicGamesReducer,
})
