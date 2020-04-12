import * as React from 'react'
import { routes } from '../routes'
import { Link, useLocation } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { getGameSocket } from '../getGameSocket'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../reducers'
import {
	playersAddAction,
	playersRemoveAction,
	playersClearAction,
} from '../actions'

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')

	const [isConnected, setIsConnected] = React.useState(false)
	const [state, setState] = React.useState('loading')
	const [gameName, setGameName] = React.useState('Unnamed')

	const nextPlayers = useSelector((state: State) => state.players.players)
	const dispatch = useDispatch()

	const location = useLocation()
	const gameId = location.hash.substr(1) || 'unknown'

	React.useEffect(() => {
		const socket = getGameSocket(gameId)
		socket.addEventListener('message', (message) => {
			//console.log('New message', message)
			const data = JSON.parse(message.data)
			console.log(data)

			if (data.connected) {
				dispatch(
					playersAddAction({
						id: data.connected.id,
					}),
				)
			}
			if (data.disconnected) {
				dispatch(playersRemoveAction(data.disconnected.id))
			}
			if (data.gameState) {
				setState(data.gameState)
			}
			if (data.gameName) {
				setGameName(data.gameName)
			}
		})
		socket.addEventListener('open', () => {
			setIsConnected(true)
			socket.send('Hello from client')
		})
		socket.addEventListener('close', () => {
			setIsConnected(false)
		})
		return () => {
			socket.close()
			dispatch(playersClearAction())
		}
	}, [])
	return (
		<>
			<Link to={routes.homepage}>Game</Link>
			<div>{isConnected ? 'connected' : 'connecting'}</div>
			<div>Name: {gameName}</div>
			<div>State: {state}</div>
			<div>Players:</div>
			<pre>{JSON.stringify(nextPlayers, null, 2)}</pre>
		</>
	)
}
