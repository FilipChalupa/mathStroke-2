import * as React from 'react'
import { TextField, Button } from '@material-ui/core'

export const Level: React.SFC = () => {
	const [solution, setSolution] = React.useState('')
	const solutionInputRef = React.useRef<HTMLInputElement>()

	const onSubmit = React.useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			console.log('@TODO: send solution to backend', solution)
			setSolution('')
			solutionInputRef.current.focus()
		},
		[solution],
	)

	return (
		<form onSubmit={onSubmit}>
			<TextField
				label="Solution"
				autoFocus
				value={solution}
				onChange={(event) => setSolution(event.target.value)}
				inputRef={solutionInputRef}
			/>
			<Button variant="contained" color="primary" type="submit">
				Submit
			</Button>
		</form>
	)
}
