import { all, fork } from 'redux-saga/effects'
import { gameRootSaga } from './game'
import { levelRootSaga } from './level'
import { lobbyCountdownRootSaga } from './lobbyCountdown'
import { publicGamesRootSaga } from './publicGames'

export const rootSaga = function* root() {
	yield all([
		fork(gameRootSaga),
		fork(levelRootSaga),
		fork(publicGamesRootSaga),
		fork(lobbyCountdownRootSaga),
	])
}
