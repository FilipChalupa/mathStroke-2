import { combineReducers } from 'redux'
import {
	numberCollectionReducer,
	NumberCollectionState,
} from './number-collection'

export interface State {
	numberCollection: NumberCollectionState
}

export const rootReducers = combineReducers<State>({
	numberCollection: numberCollectionReducer,
})
