import { Button, Container, Grid, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'

export interface PlayerControlsProps {
	onSolution: (solution: string) => void
}

export const PlayerControls: FunctionComponent<PlayerControlsProps> = ({
	onSolution,
}) => {
	const [input, setInput] = useState('')
	const isLoading = false // @TODO

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
							disabled={isLoading}
							onChange={(event) => {
								setInput(event.target.value)
							}}
							autoComplete="off"
							autoFocus
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item>
						<Button variant="contained" type="submit" disabled={isLoading}>
							Fire
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}
