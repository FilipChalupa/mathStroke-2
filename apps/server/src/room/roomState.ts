import { RoomState, RoomStateSpecific } from 'messages'
import { assertNever } from 'utilities'
import { Client, createClients } from './clients'
import { Level, createLevel } from './level'

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
		const handleFinish = (byWin: boolean) => {
			level.destroy()
			transitionToLobby(byWin)
		}
		const level = createLevel(log, levelNumber, handleFinish)
		state = {
			levelIndex: state.levelIndex,
			state: 'level',
			level,
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

		// @TODO: remove
		setTimeout(() => {
			transitionToLevel()
		}, 3000)
	}

	// @TODO: remove
	setTimeout(() => {
		transitionToLevel()
	}, 3000)

	return {
		getState,
	}
}
