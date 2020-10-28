import {
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core'
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
		</>
	)
}
