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

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')

	const players = useSelector((state: State) => state.players.players)
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
			<div>{isConnected ? 'connected' : 'connecting'}</div>
			<div>{isLoading ? 'loading' : 'loaded'}</div>
			{gameInfo && (
				<>
					<div>Name: {gameInfo.name}</div>
					<div>State: {gameInfo.state}</div>
				</>
			)}
			<div>Players:</div>
			<pre>{JSON.stringify(players, null, 2)}</pre>
		</>
	)
}
