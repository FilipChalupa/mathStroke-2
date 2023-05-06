import { RoomState, RoomStateSpecific } from 'messages'
import { assertNever } from 'utilities'
import { Client, createClients } from './clients'
import { Level, createLevel } from './level'
import { levels } from './levels'

type PrivateRoomState = { levelIndex: number } & (
	| {
			state: 'lobby'
	  }
	| {
			state: 'level'
			level: Level
	  }
)

export const createRoomState = (
	log: (message: string) => void,
	clients: ReturnType<typeof createClients>,
) => {
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

	const broadcastNewRoomState = () => {
		clients.actions.updateRoomState(getState())
	}

	const handleNewClient = (client: Client) => {
		clients.actions.updateRoomState(getState(), client)
	}
	clients.newClient.addListener(handleNewClient)

	const transitionToLevel = () => {
		const levelNumber = state.levelIndex + 1
		state = {
			levelIndex: state.levelIndex,
			state: 'level',
			level: createLevel(levelNumber),
		}
		log(`Transitioning to level ${levelNumber}`)
		broadcastNewRoomState()
	}
	const transitionToLobby = (byWin: boolean) => {
		const levelIndex = byWin ? state.levelIndex + 1 : 0
		state = {
			levelIndex,
			state: 'lobby',
		}
		log(`Transitioning to lobby by ${byWin ? 'win' : 'fail'}`)
		broadcastNewRoomState()
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
	}
}
