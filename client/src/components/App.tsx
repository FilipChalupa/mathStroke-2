import * as React from 'react'
import { ThemeProvider } from './ThemeProvider.tsx'
import { Typography, Button, Grid } from '@material-ui/core'

export const App: React.SFC = () => (
	<ThemeProvider>
		<Grid container justify="center" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h3" align="center">
					mathStroke 2
				</Typography>
			</Grid>
			<Grid item>
				<Button href="/new-game" variant="contained" color="primary">
					New game
				</Button>
			</Grid>
			<Grid item>
				<Button href="/join-game" variant="contained" color="secondary">
					Join game
				</Button>
			</Grid>
		</Grid>
	</ThemeProvider>
)
