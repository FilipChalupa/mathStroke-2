import { listenable } from 'custom-listenable'
import { RoomState, RoomStateSpecific } from 'messages'
import { assertNever } from 'utilities'
import { levels } from './levels'

type PrivateRoomState = { levelIndex: number } & (
	| {
			state: 'lobby'
	  }
	| {
			state: 'level'
	  }
)

export const createRoomState = (log: (message: string) => void) => {
	let state: PrivateRoomState = {
		levelIndex: 0,
		state: 'lobby',
	}

	const getState = (): RoomState => {
		const specificState: RoomStateSpecific = (() => {
			if (state.state === 'lobby') {
				return {
					state: 'lobby',
				}
			} else if (state.state === 'level') {
				return {
					state: 'level',
				}
			} else {
				assertNever(state)
				throw new Error('Unreachable')
			}
		})()
		return {
			...specificState,
			levelNumber: state.levelIndex + 1,
		}
	}

	const roomStateListener = listenable<[state: RoomState]>()

	const transitionToLevel = () => {
		state = {
			levelIndex: state.levelIndex,
			state: 'level',
		}
		log(`Transitioning to level ${state.levelIndex + 1}`)
		roomStateListener.emit(getState())
	}
	const transitionToLobby = (byWin: boolean) => {
		const levelIndex = byWin ? state.levelIndex + 1 : 0
		state = {
			levelIndex,
			state: 'lobby',
		}
		log(`Transitioning to lobby by ${byWin ? 'win' : 'fail'}`)
		roomStateListener.emit(getState())
	}

	// This is fake for now, but will be implemented later
	const lifeCycleLoop = () => {
		if (state.state === 'level') {
			setTimeout(() => {
				transitionToLobby(state.levelIndex < levels.length - 1 /* @TODO */)
				lifeCycleLoop()
			}, 10000)
		} else if (state.state === 'lobby') {
			setTimeout(() => {
				transitionToLevel()
				lifeCycleLoop()
			}, 3000)
		}
	}
	lifeCycleLoop()

	return {
		getState,
		addRoomStateListener: roomStateListener.addListener,
		removeRoomStateListener: roomStateListener.removeListener,
	}
}
