import { combineReducers } from 'redux'
import { gameReducer, GameState } from './game'
import { levelReducer, LevelState } from './level'
import { lobbyCountdownReducer, LobbyCountdownState } from './lobbyCountdown'
import { playersReducer, PlayersState } from './players'
import { publicGamesReducer, PublicGamesState } from './publicGames'
import { tasksReducer, TasksState } from './tasks'

export interface State {
	game: GameState
	level: LevelState
	lobbyCountdown: LobbyCountdownState
	players: PlayersState
	publicGames: PublicGamesState
	tasks: TasksState
}

export const rootReducers = combineReducers<State>({
	game: gameReducer,
	level: levelReducer,
	lobbyCountdown: lobbyCountdownReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
	tasks: tasksReducer,
})
