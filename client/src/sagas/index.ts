import { all, fork } from 'redux-saga/effects'
import { watchNewGeneratedNumberRequestStart } from './number-collection'
import { watchPublicGamesRequestStart } from './publicGames'

export const rootSaga = function* root() {
	yield all([fork(watchNewGeneratedNumberRequestStart)])
	yield all([fork(watchPublicGamesRequestStart)])
}
