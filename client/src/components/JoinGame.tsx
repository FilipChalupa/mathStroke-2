import {
	Button,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RefreshIcon from '@material-ui/icons/Refresh'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { publicGamesRequestStartAction } from '../actions'
import { createGameUrl } from '../createGameUrl'
import { routes } from '../routes'
import { useStateSelector } from '../useStateSelector'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'

export const JoinGame: React.FunctionComponent = () => {
	useUpdateTitleOnMount('Join game')

	const { games, loading } = useStateSelector((state) => state.publicGames)
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(publicGamesRequestStartAction())
	}, [])

	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Join game</Link>
			</Typography>
			<Grid container justify="center" spacing={2}>
				<Grid item>
					<Button
						startIcon={<RefreshIcon />}
						disabled={loading}
						variant="contained"
						onClick={() => dispatch(publicGamesRequestStartAction())}
					>
						Refresh
					</Button>
				</Grid>
				<Grid item>
					<Button
						startIcon={<AddIcon />}
						component={Link}
						to={routes.newGame}
						variant="contained"
						color="primary"
					>
						New game
					</Button>
				</Grid>
			</Grid>
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
		</>
	)
}
