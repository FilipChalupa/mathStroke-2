import { all, fork, put, call, takeEvery } from 'redux-saga/effects'
import { actionIds } from '../common'
import { getPublicGames } from '../getPublicGames'
import { publicGamesRequestCompletedAction } from '../actions/publicGames'

function* watchPublicGamesRequestStart() {
	yield takeEvery(actionIds.PUBLIC_GAMES_REQUEST_START, requestPublicGames)
}

function* requestPublicGames() {
	// @TODO: deduce games ts type
	const games = yield call(getPublicGames)
	yield put(publicGamesRequestCompletedAction(games))
}

export function* publicGamesRootSaga() {
	yield all([fork(watchPublicGamesRequestStart)])
}
