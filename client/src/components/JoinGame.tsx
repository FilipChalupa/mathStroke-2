import * as React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { routes } from '../routes'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'
import { getPublicGames, getPublicGamesRequestParser } from '../getPublicGames'
import { createGameUrl } from '../createGameUrl'

type GamesType = ReturnType<typeof getPublicGamesRequestParser>['games']

export const JoinGame: React.SFC = () => {
	useUpdateTitleOnMount('Join game')

	const [games, setGames] = React.useState<GamesType>([])

	React.useEffect(() => {
		;(async () => setGames(await getPublicGames()))()
	}, [])

	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Join game</Link>
			</Typography>
			<ul>
				{games.map((game: any /* @TODO: remove any */) => (
					<li key={game.id}>
						<Link to={createGameUrl(game.id)}>{game.name}</Link>
					</li>
				))}
			</ul>
		</>
	)
}
