import * as React from 'react'
import { Typography } from '@material-ui/core'
import { routes } from '../routes'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { getGameSocket } from '../getGameSocket'

interface Player {
	id: string
}

let playersWorkaround: Player[] = []

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')

	const [isConnected, setIsConnected] = React.useState(false)
	const [state, setState] = React.useState('loading')
	const [players, setPlayers] = React.useState<Player[]>([])

	const addPlayer = React.useCallback(
		(player: Player) => {
			playersWorkaround = playersWorkaround.concat(player)
			setPlayers(players.concat(player))
		},
		[players],
	)

	const removePlayer = React.useCallback(
		(playerId: Player['id']) => {
			playersWorkaround = playersWorkaround.filter(
				(player) => player.id !== playerId,
			)
			setPlayers(players.filter((player) => player.id !== playerId))
		},
		[players],
	)

	const location = useLocation()
	const gameId = location.hash.substr(1) || 'unknown'

	React.useEffect(() => {
		playersWorkaround = []
		const socket = getGameSocket(gameId)
		socket.addEventListener('message', (message) => {
			//console.log('New message', message)
			const data = JSON.parse(message.data)
			console.log(data)

			if (data.connected) {
				addPlayer({
					id: data.connected.id,
				})
			}
			if (data.disconnected) {
				removePlayer(data.disconnected.id)
			}
			if (data.state) {
				setState(data.state)
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
		}
	}, [])
	return (
		<>
			<Link to={routes.homepage}>Game</Link>
			<div>{isConnected ? 'connected' : 'connecting'}</div>
			<div>State: {state}</div>
			<div>Players:</div>
			<pre>{JSON.stringify(playersWorkaround, null, 2)}</pre>
		</>
	)
}
