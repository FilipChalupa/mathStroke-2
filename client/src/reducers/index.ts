import { combineReducers } from 'redux'
import { gameReducer, GameState } from './game'
import { lobbyCountdownReducer, LobbyCountdownState } from './lobbyCountdown'
import { playersReducer, PlayersState } from './players'
import { publicGamesReducer, PublicGamesState } from './publicGames'
import { LevelState, levelReducer } from './level'

export interface State {
	game: GameState
	level: LevelState
	lobbyCountdown: LobbyCountdownState
	players: PlayersState
	publicGames: PublicGamesState
}

export const rootReducers = combineReducers<State>({
	game: gameReducer,
	level: levelReducer,
	lobbyCountdown: lobbyCountdownReducer,
	players: playersReducer,
	publicGames: publicGamesReducer,
})
