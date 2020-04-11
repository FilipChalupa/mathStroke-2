import * as React from 'react'
import { Typography } from '@material-ui/core'
import { routes } from '../routes'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { getGameSocket } from '../getGameSocket'

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')

	const history = useHistory()
	const [isConnected, setIsConnected] = React.useState(false)

	const location = useLocation()
	const gameId = location.hash.substr(1) || 'unknown'

	React.useEffect(() => {
		const socket = getGameSocket(gameId)
		socket.addEventListener('message', (message) => {
			console.log('New message', message)
		})
		socket.addEventListener('open', () => {
			setIsConnected(true)
			socket.send('Hello from client')
		})
		socket.addEventListener('close', () => {
			setIsConnected(false)
			alert('Connection closed')
			history.push(routes.joinGame)
		})
		return () => {
			socket.close()
		}
	}, [])
	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Game</Link>
				<div>{isConnected ? 'connected' : 'connecting'}</div>
			</Typography>
		</>
	)
}
