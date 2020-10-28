import { Button, Grid, Typography } from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount'

export const Homepage: React.SFC = () => {
	useUpdateTitleOnMount('')
	return (
		<>
			<Typography variant="h3" align="center">
				mathStroke 2
			</Typography>

			<Grid container justify="center" spacing={2}>
				<Grid item>
					<Button
						component={Link}
						to={routes.newGame}
						variant="contained"
						color="primary"
					>
						New game
					</Button>
				</Grid>
				<Grid item>
					<Button
						component={Link}
						to={routes.joinGame}
						variant="contained"
						color="secondary"
					>
						Join game
					</Button>
				</Grid>
			</Grid>
		</>
	)
}
