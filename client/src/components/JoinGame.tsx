import {
	Button,
	LinearProgress,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { publicGamesRequestStartAction } from '../actions'
import { createGameUrl } from '../createGameUrl'
import { State } from '../reducers'
import { routes } from '../routes'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'

export const JoinGame: React.FunctionComponent = () => {
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
			<List>
				{games.map((game) => (
					<ListItem
						key={game.id}
						button
						component={Link}
						to={createGameUrl(game.id)}
					>
						<ListItemIcon>
							<SportsEsportsIcon />
						</ListItemIcon>
						<ListItemText
							primary={game.name}
							secondary={`Players: ${game.playersCount}`}
						/>
					</ListItem>
				))}
			</List>
			{loading && <LinearProgress />}
		</>
	)
}
