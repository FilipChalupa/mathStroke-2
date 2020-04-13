import { all, fork } from 'redux-saga/effects'
import { gameRootSaga } from './game'
import { lobbyCountdownRootSaga } from './lobbyCountdown'
import { publicGamesRootSaga } from './publicGames'

export const rootSaga = function* root() {
	yield all([
		fork(gameRootSaga),
		fork(publicGamesRootSaga),
		fork(lobbyCountdownRootSaga),
	])
}
