import {
	all,
	cancel,
	fork,
	call,
	take,
	takeEvery,
	put,
} from 'redux-saga/effects'
import { actionIds } from '../common'
import {
	gameDisconnectRequestCompletedAction,
	playersClearAction,
	gameDisconnectRequestStartAction,
	gameConnectRequestCompletedAction,
	playersAddAction,
	playersRemoveAction,
	gameUpdateInfoAction,
} from '../actions'
import { getGameSocket, closeGameSocket } from '../gameConnection'
import { eventChannel } from 'redux-saga'

function* gameConnectionFlow() {
	// @TODO: error handling
	while (true) {
		const gameId: string = (yield take(actionIds.GAME_CONNECT_REQUEST_START))
			.payload.gameId
		console.log('connect', gameId)
		const socket: WebSocket = yield call(getGameSocket, gameId)
		console.log('connected')
		const socketTask = yield fork(handleSocket, socket)
		yield put(gameConnectRequestCompletedAction())
		yield take(actionIds.GAME_DISCONNECT_REQUEST_START)
		yield cancel(socketTask)
		closeGameSocket(socket)
		console.log('disconnected')
		yield put(gameDisconnectRequestCompletedAction())
	}
}

function subscribeToGameSocket(socket: WebSocket) {
	return eventChannel((emit) => {
		const onClose = () => {
			console.log('socket closed :(')
			emit(gameDisconnectRequestStartAction())
		}

		const onMessage = (message: MessageEvent) => {
			const data = JSON.parse(message.data)

			if (data.connected) {
				emit(
					playersAddAction({
						id: data.connected.id,
					}),
				)
			}
			if (data.disconnected) {
				emit(playersRemoveAction(data.disconnected.id))
			}
			if (data.gameState) {
				emit(
					gameUpdateInfoAction({
						state: data.gameState,
					}),
				)
			}
			if (data.gameName) {
				emit(
					gameUpdateInfoAction({
						name: data.gameName,
					}),
				)
			}
		}

		socket.addEventListener('close', onClose)
		socket.addEventListener('message', onMessage)

		return () => {
			// @TODO investigate why this ain't happenning - causes double close
			console.log('remove listeners')
			socket.removeEventListener('close', onClose)
			socket.removeEventListener('message', onMessage)
		}
	})
}

function* read(socket: WebSocket) {
	const channel = yield call(subscribeToGameSocket, socket)
	while (true) {
		const action = yield take(channel)
		yield put(action)
	}
}

function* handleSocket(socket: WebSocket) {
	yield fork(read, socket)
}

function* watchGameDisconnectRequestCompleted() {
	yield takeEvery(
		actionIds.GAME_DISCONNECT_REQUEST_COMPLETED,
		requestGameDisconnectCompleted,
	)
}

function* requestGameDisconnectCompleted() {
	yield put(playersClearAction())
}

export function* gameRootSaga() {
	yield all([
		fork(gameConnectionFlow),
		fork(watchGameDisconnectRequestCompleted),
	])
}
