import { Button, Container, Grid, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'

export interface PlayerControlsProps {
	onSolution: (solution: string) => void
	waitingForHitConfirmation: boolean
}

export const PlayerControls: FunctionComponent<PlayerControlsProps> = ({
	onSolution,
	waitingForHitConfirmation,
}) => {
	const [input, setInput] = useState('')

	return (
		<Container maxWidth="xs">
			<form
				onSubmit={async (event) => {
					event.preventDefault()
					onSolution(input)
					setInput('')
				}}
			>
				<Grid container gap={1}>
					<Grid item flexGrow={1}>
						<TextField
							size="small"
							label="Your solution"
							variant="outlined"
							value={input}
							fullWidth
							onChange={(event) => {
								setInput(event.target.value)
							}}
							autoComplete="off"
							autoFocus
							inputMode="none"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							type="submit"
							disabled={waitingForHitConfirmation}
						>
							Fire
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}
