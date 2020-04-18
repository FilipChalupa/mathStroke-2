import * as React from 'react'
import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { levelSubmitSolutionStartAction } from '../actions/level'
import { State } from '../reducers'

export const Level: React.SFC = () => {
	const [solution, setSolution] = React.useState('')
	const solutionInputRef = React.useRef<HTMLInputElement>()
	const isDisabled = useSelector(
		(state: State) => state.level.isSubmittingSolution,
	)

	const dispatch = useDispatch()

	const onSubmit = React.useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			console.log('@TODO: send solution to backend', solution)
			//setSolution('')
			//solutionInputRef.current.focus()
			dispatch(levelSubmitSolutionStartAction(solution))
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
				disabled={isDisabled}
			/>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				disabled={isDisabled}
			>
				Submit
			</Button>
		</form>
	)
}
