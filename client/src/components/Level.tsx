import * as React from 'react'
import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { levelSubmitSolutionStartAction } from '../actions/level'
import { State } from '../reducers'

export const Level: React.SFC = () => {
	const [solution, setSolution] = React.useState('')
	const solutionInputRef = React.useRef<HTMLInputElement>()
	const { isSubmittingSolution, isOnCooldown } = useSelector(
		(state: State) => state.level,
	)
	const isDisabled = isSubmittingSolution || isOnCooldown

	const dispatch = useDispatch()

	const onSubmit = React.useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			// @TODO: clear solution input on success
			//setSolution('')
			dispatch(levelSubmitSolutionStartAction(solution))
		},
		[solution],
	)

	React.useEffect(() => {
		solutionInputRef.current.focus()
	}, [isDisabled])

	return (
		<form onSubmit={onSubmit}>
			<TextField
				label="Solution"
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
