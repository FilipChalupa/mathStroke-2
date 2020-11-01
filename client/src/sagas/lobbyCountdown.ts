import {
	all,
	call,
	fork,
	put,
	race,
	take,
	takeLatest,
} from 'redux-saga/effects'
import { getCurrentTimestamp } from '../../../common/getCurrentTimestamp'
import { lobbyCountdownSetRemainingSecondsCountdownAction } from '../actions/lobbyCountdown'
import { actionIds, BaseAction } from '../common'

function* countdown(action: BaseAction) {
	const { remainingTime } = action.payload
	const finishTime = getCurrentTimestamp() + remainingTime

	const wait = (duration: number) =>
		new Promise((resolve) => setTimeout(resolve, duration))
	while (true) {
		const currentTime = getCurrentTimestamp()
		const remainingSeconds =
			Math.ceil(Math.max(0, finishTime - currentTime) / 1000) - 1
		yield put(
			lobbyCountdownSetRemainingSecondsCountdownAction(remainingSeconds),
		)
		if (remainingSeconds === 0) {
			break
		}
		const nextSecondInTimeDuration =
			finishTime - currentTime - remainingSeconds * 1000
		const result = yield race({
			timer: call(wait, nextSecondInTimeDuration),
			stop: take(actionIds.LOBBY_COUNTDOWN_STOP_COUNTDOWN),
		})
		if (typeof result.stop !== 'undefined') {
			break
		}
	}
}

function* watchLobbyCountdownStartCountdown() {
	yield takeLatest(actionIds.LOBBY_COUNTDOWN_START_COUNTDOWN, countdown)
}

export function* lobbyCountdownRootSaga() {
	yield all([fork(watchLobbyCountdownStartCountdown)])
}
