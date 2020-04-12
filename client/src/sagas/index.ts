import { all, fork } from 'redux-saga/effects'
import { gameRootSaga } from './game'
import { watchNewGeneratedNumberRequestStart } from './number-collection'
import { publicGamesRootSaga } from './publicGames'

export const rootSaga = function* root() {
	yield all([
		fork(gameRootSaga),
		fork(watchNewGeneratedNumberRequestStart),
		fork(publicGamesRootSaga),
	])
}
