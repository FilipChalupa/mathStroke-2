import { Container } from '@material-ui/core'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
	gameConnectRequestStartAction,
	gameDisconnectRequestStartAction,
} from '../actions'
import { useLocationHash } from '../useLocationHash'
import { useStateSelector } from '../useStateSelector'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { Level } from './Level'
import { Lobby } from './Lobby'

export const Game: React.FunctionComponent = () => {
	useUpdateTitleOnMount('Game')

	const dispatch = useDispatch()

	const gameId = useLocationHash() || 'unknown'

	const { isConnected, isLoading, gameInfo } = useStateSelector(
		(state) => state.game,
	)

	React.useEffect(() => {
		dispatch(gameConnectRequestStartAction(gameId))
		return () => {
			dispatch(gameDisconnectRequestStartAction())
		}
	}, [])
	return (
		<>
			<Container maxWidth="md">
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
			</Container>
			{gameInfo && gameInfo.state === 'lobby' && (
				<Container maxWidth="md">
					<Lobby />
				</Container>
			)}
			{gameInfo && gameInfo.state === 'level' && (
				<Container maxWidth="sm">
					<Level />
				</Container>
			)}
		</>
	)
}
