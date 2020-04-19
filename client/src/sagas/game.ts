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
	playersClearIsReady,
	levelClearAction,
	levelSolutionAcceptedAction,
	levelSolutionRejectedAction,
} from '../actions'
import { getGameSocket, closeGameSocket, sendToSocket } from '../gameConnection'
import { eventChannel } from 'redux-saga'
import { PayloadFromClient } from '../../../common/PayloadFromClient'
import { PayloadFromServer } from '../../../common/PayloadFromServer'
import { Player } from '../reducers/players'

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
			const payload = JSON.parse(message.data) as PayloadFromServer

			console.log('New message from server')
			console.log('Type:', payload.type)
			console.log('Data:', payload.data)

			if (payload.type === PayloadFromServer.Type.GameState) {
				if (payload.data.value === 'level') {
					emit(levelClearAction()) // @TODO: clear level on leaving
				}
				emit(
					gameUpdateInfoAction({
						state: payload.data.value,
					}),
				)
			} else if (payload.type === PayloadFromServer.Type.GameName) {
				emit(
					gameUpdateInfoAction({
						name: payload.data.value,
					}),
				)
			} else if (payload.type === PayloadFromServer.Type.LocalPlayerId) {
				emit(playersSetLocalPlayerId(payload.data.value))
			} else if (payload.type === PayloadFromServer.Type.ConnectedPlayer) {
				emit(
					playersAddAction(
						new Player(
							payload.data.id,
							payload.data.isSpectating,
							payload.data.isReady,
							payload.data.name,
						),
					),
				)
			} else if (payload.type === PayloadFromServer.Type.DisconnectedPlayer) {
				emit(playersRemoveAction(payload.data.id))
			} else if (payload.type === PayloadFromServer.Type.IsSpectating) {
				emit(playersSetIsSpectating(payload.data.playerId, payload.data.value))
			} else if (payload.type === PayloadFromServer.Type.IsReady) {
				emit(playersSetIsReady(payload.data.playerId, payload.data.value))
			} else if (payload.type === PayloadFromServer.Type.ClearIsReady) {
				emit(playersClearIsReady())
			} else if (payload.type === PayloadFromServer.Type.LobbyCountdown) {
				emit(
					payload.data.duration === null
						? lobbyCountdownStopCountdownAction()
						: lobbyCountdownStartCountdownAction(payload.data.duration),
				)
			} else if (payload.type === PayloadFromServer.Type.LevelSolutionVerdict) {
				if (payload.data.isAccepted) {
					emit(levelSolutionAcceptedAction(payload.data.cooldown))
				} else {
					emit(levelSolutionRejectedAction(payload.data.cooldown))
				}
			} else {
				// @TODO: check type never in typescript compilation
				throw Error(`Unknown message type "${payload!.type}" from server.`)
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
			sendToSocket(
				socket,
				PayloadFromClient.createIsReady(action.payload.isReady),
			)
		})
	})
	yield fork(function* () {
		yield takeLatest(actionIds.PLAYERS_SET_LOCAL_IS_SPECTATING, function* (
			action: any,
		) {
			sendToSocket(
				socket,
				PayloadFromClient.createIsSpectating(action.payload.isSpectating),
			)
		})
	})
	yield fork(function* () {
		yield takeLatest(actionIds.LEVEL_SUBMIT_SOLUTION_START, function* (
			action: any,
		) {
			sendToSocket(
				socket,
				PayloadFromClient.createSubmitSolution(action.payload.solution),
			)
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
