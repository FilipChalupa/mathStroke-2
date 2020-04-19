import { all, cancel, delay, fork, put, race, take } from 'redux-saga/effects'
import { levelClearCooldownAction } from '../actions'
import { actionIds } from '../common'

function* handleCooldown() {
	const solutionVerdict = yield race({
		accepted: take(actionIds.LEVEL_SOLUTION_ACCEPTED),
		rejected: take(actionIds.LEVEL_SOLUTION_REJECTED),
	})
	const { cooldown } =
		solutionVerdict.accepted?.payload || solutionVerdict.rejected.payload
	yield delay(cooldown)
	yield put(levelClearCooldownAction())
}

function* levelSolutionFlow() {
	while (yield take(actionIds.LEVEL_SUBMIT_SOLUTION_START)) {
		const cooldownTask = yield fork(handleCooldown)
		yield take(actionIds.LEVEL_CLEAR)
		yield cancel(cooldownTask)
	}
}

export function* levelRootSaga() {
	yield all([fork(levelSolutionFlow)])
}
