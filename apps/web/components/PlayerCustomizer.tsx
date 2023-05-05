import {
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { Color, colors } from '../utilities/colors'
import {
	usePlayerColor,
	usePlayerName,
	useSetPlayerColor,
	useSetPlayerName,
} from './PlayerProvider'

export const PlayerCustomizer: FunctionComponent = () => {
	const playerName = usePlayerName()
	const setPlayerName = useSetPlayerName()
	const playerColor = usePlayerColor()
	const setPlayerColor = useSetPlayerColor()

	return (
		<Container maxWidth="sm">
			<Typography variant="h5" component="h2" gutterBottom>
				You
			</Typography>
			<Grid container gap={1}>
				<Grid item>
					<TextField
						label="Name"
						value={playerName}
						onChange={(event) => {
							setPlayerName(event.target.value)
						}}
					/>
				</Grid>
				<Grid item flexGrow={1}>
					<FormControl>
						<FormLabel id="radio-color">Color</FormLabel>
						<RadioGroup
							aria-labelledby="radio-color"
							value={playerColor}
							onChange={(event) => {
								setPlayerColor(event.target.value as Color)
							}}
							row
						>
							{colors.map((color) => (
								<FormControlLabel
									key={color}
									value={color}
									control={<Radio />}
									label={color}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
		</Container>
	)
}
