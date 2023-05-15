import { Button, Container, Grid, TextField } from '@mui/material'
import {
	FunctionComponent,
	MouseEventHandler,
	useCallback,
	useState,
} from 'react'

export interface PlayerControlsProps {
	onSolution: (solution: string) => void
	waitingForHitConfirmation: boolean
}

export const PlayerControls: FunctionComponent<PlayerControlsProps> = ({
	onSolution,
	waitingForHitConfirmation,
}) => {
	const [input, setInput] = useState('')

	const handleNumberClick = useCallback((value: number) => {
		setInput((input) => input + value.toString())
	}, [])
	const handleBackspaceClick = useCallback<
		MouseEventHandler<HTMLButtonElement>
	>((event) => {
		setInput((input) => input.substring(0, input.length - 1))
	}, [])

	return (
		<Container maxWidth="xs" disableGutters>
			<form
				onSubmit={async (event) => {
					event.preventDefault()
					if (input.length === 0) {
						return
					}
					onSolution(input)
					setInput('')
				}}
			>
				<Grid container spacing={1}>
					<Grid item xs={8}>
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
					<Grid item xs={4}>
						<Button
							variant="contained"
							type="submit"
							fullWidth
							disabled={waitingForHitConfirmation}
						>
							Fire
						</Button>
					</Grid>
					<NumberButton value={1} onClick={handleNumberClick} />
					<NumberButton value={2} onClick={handleNumberClick} />
					<NumberButton value={3} onClick={handleNumberClick} />
					<NumberButton value={4} onClick={handleNumberClick} />
					<NumberButton value={5} onClick={handleNumberClick} />
					<NumberButton value={6} onClick={handleNumberClick} />
					<NumberButton value={7} onClick={handleNumberClick} />
					<NumberButton value={8} onClick={handleNumberClick} />
					<NumberButton value={9} onClick={handleNumberClick} />
					<Grid item xs={4} />
					<NumberButton value={0} onClick={handleNumberClick} />
					<Grid item xs={4}>
						<Button
							variant="contained"
							type="button"
							fullWidth
							onClick={handleBackspaceClick}
						>
							⬅
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}

const NumberButton: FunctionComponent<{
	value: number
	onClick: (value: number) => void
}> = ({ value, onClick }) => (
	<Grid item xs={4}>
		<Button
			variant="contained"
			type="button"
			fullWidth
			onClick={() => {
				onClick(value)
			}}
		>
			{value}
		</Button>
	</Grid>
)
