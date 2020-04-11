import * as React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { routes } from '../routes'
import { Link } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount.ts'

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
