import {
	all,
	cancel,
	fork,
	call,
	take,
	takeEvery,
	put,
	takeLatest,
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
	playersSetLocalPlayerId,
	playersSetIsSpectating,
	playersSetIsReady,
	lobbyCountdownStopCountdownAction,
	lobbyCountdownStartCountdownAction,
} from '../actions'
import { getGameSocket, closeGameSocket, sendToSocket } from '../gameConnection'
import { eventChannel } from 'redux-saga'
import { Payload } from '../Payload'

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

			if (typeof data.playerConnected !== 'undefined') {
				emit(
					playersAddAction({
						id: data.playerConnected.id,
						isSpectating: data.playerConnected.isSpectating,
						isReady: data.playerConnected.isReady,
						name: data.playerConnected.name,
					}),
				)
			}
			if (typeof data.localPlayerId !== 'undefined') {
				emit(playersSetLocalPlayerId(data.localPlayerId))
			}
			if (typeof data.playerDisconnected !== 'undefined') {
				emit(playersRemoveAction(data.playerDisconnected.id))
			}
			if (typeof data.isSpectating !== 'undefined') {
				emit(
					playersSetIsSpectating(
						data.isSpectating.playerId,
						data.isSpectating.value,
					),
				)
			}
			if (typeof data.isReady !== 'undefined') {
				emit(playersSetIsReady(data.isReady.playerId, data.isReady.value))
			}
			if (typeof data.gameState !== 'undefined') {
				emit(
					gameUpdateInfoAction({
						state: data.gameState,
					}),
				)
			}
			if (typeof data.gameName !== 'undefined') {
				emit(
					gameUpdateInfoAction({
						name: data.gameName,
					}),
				)
			}
			if (typeof data.lobbyCountdown !== 'undefined') {
				emit(
					data.lobbyCountdown.duration === null
						? lobbyCountdownStopCountdownAction()
						: lobbyCountdownStartCountdownAction(data.lobbyCountdown.duration),
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

function* write(socket: WebSocket) {
	yield fork(function* () {
		yield takeLatest(actionIds.PLAYERS_SET_LOCAL_IS_READY, function* (
			action: any,
		) {
			sendToSocket(socket, Payload.isReady(action.payload.isReady))
		})
	})
	yield fork(function* () {
		yield takeLatest(actionIds.PLAYERS_SET_LOCAL_IS_SPECTATING, function* (
			action: any,
		) {
			sendToSocket(socket, Payload.isSpectating(action.payload.isSpectating))
		})
	})
}

function* handleSocket(socket: WebSocket) {
	yield fork(read, socket)
	yield fork(write, socket)
}

function* watchGameDisconnectRequestCompleted() {
	yield takeEvery(
		actionIds.GAME_DISCONNECT_REQUEST_COMPLETED,
		requestGameDisconnectCompleted,
	)
}

function* requestGameDisconnectCompleted() {
	yield put(playersClearAction())
	yield put(lobbyCountdownStopCountdownAction())
}

export function* gameRootSaga() {
	yield all([
		fork(gameConnectionFlow),
		fork(watchGameDisconnectRequestCompleted),
	])
}
