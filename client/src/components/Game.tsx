import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	gameConnectRequestStartAction,
	gameDisconnectRequestStartAction,
} from '../actions'
import { State } from '../reducers'
import { routes } from '../routes'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { useLocationHash } from '../useLocationHash'
import { Lobby } from './Lobby'
import { Level } from './Level'

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')

	const dispatch = useDispatch()

	const gameId = useLocationHash() || 'unknown'

	const { isConnected, isLoading, gameInfo } = useSelector(
		(state: State) => state.game,
	)

	React.useEffect(() => {
		dispatch(gameConnectRequestStartAction(gameId))
		return () => {
			dispatch(gameDisconnectRequestStartAction())
		}
	}, [])
	return (
		<>
			<Link to={routes.homepage}>Game</Link>
			<div>
				{isConnected ? 'connected' : 'connecting'}{' '}
				{isLoading ? 'loading' : 'loaded'}
			</div>
			{gameInfo && (
				<>
					<div>Name: {gameInfo.name}</div>
					<div>State: {gameInfo.state}</div>
				</>
			)}
			{gameInfo && gameInfo.state === 'lobby' && <Lobby />}
			{gameInfo && gameInfo.state === 'level' && <Level />}
		</>
	)
}
