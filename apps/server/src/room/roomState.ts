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
					shield: state.level.getShield(),
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

	const handleReadinessChange: (value: {
		ready: number
		total: number
	}) => void = ({ ready, total }) => {
		if (state.state !== 'lobby') {
			return
		}
		// @TODO: use smater countdown - all ready start, some ready start later
		if (ready === total && total > 0) {
			transitionToLevel()
		}
	}
	clients.readiness.addListener(handleReadinessChange)

	const transitionToLevel = () => {
		const levelNumber = state.levelIndex + 1
		log(`Transitioning to level ${levelNumber}`)
		const handleFinish = (byWin: boolean) => {
			level.destroy()
			transitionToLobby(byWin)
		}
		const level = createLevel(log, clients, levelNumber, handleFinish)
		state = {
			levelIndex: state.levelIndex,
			state: 'level',
			level,
		}
		broadcastNewRoomState()
	}
	const transitionToLobby = (byWin: boolean) => {
		clients.actions.resetReadiness()
		const levelIndex = byWin ? state.levelIndex + 1 : 0
		state = {
			levelIndex,
			state: 'lobby',
		}
		log(`Transitioning to lobby by ${byWin ? 'win' : 'fail'}`)
		broadcastNewRoomState()
	}

	// @TODO: remove this
	// setInterval(() => {
	// 	if (state.state === 'lobby') {
	// 		transitionToLevel()
	// 	}
	// }, 300)

	return {
		getState,
	}
}
