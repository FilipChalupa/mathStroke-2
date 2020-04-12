import * as React from 'react'
import { Typography, LinearProgress, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { routes } from '../routes'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { createGameUrl } from '../createGameUrl'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../reducers'
import { publicGamesRequestStartAction } from '../actions'

export const JoinGame: React.SFC = () => {
	useUpdateTitleOnMount('Join game')

	const { games, loading } = useSelector((state: State) => state.publicGames)
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(publicGamesRequestStartAction())
	}, [])

	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Join game</Link>
			</Typography>
			<Button
				disabled={loading}
				variant="contained"
				onClick={() => dispatch(publicGamesRequestStartAction())}
			>
				Refresh
			</Button>
			<ul>
				{games.map((game) => (
					<li key={game.id}>
						<Link to={createGameUrl(game.id)}>
							{game.name} ({game.playersCount})
						</Link>
					</li>
				))}
			</ul>
			{loading && <LinearProgress />}
		</>
	)
}
