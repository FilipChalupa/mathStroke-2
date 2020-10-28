import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { levelSubmitSolutionStartAction } from '../actions/level'
import { useStateSelector } from '../useStateSelector'
import { Tasks } from './Tasks'

export const Level: React.SFC = () => {
	const [solution, setSolution] = React.useState('')
	const solutionInputRef = React.useRef<HTMLInputElement>()
	const { isSubmittingSolution, isOnCooldown } = useStateSelector(
		(state) => state.level,
	)
	const isDisabled = isSubmittingSolution || isOnCooldown

	const dispatch = useDispatch()

	const onSubmit = React.useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault()
			dispatch(levelSubmitSolutionStartAction(solution))
		},
		[solution],
	)

	React.useEffect(() => {
		if (isDisabled === false) {
			setSolution('')
		}
		solutionInputRef.current.focus()
	}, [isDisabled])

	return (
		<>
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
			<Tasks />
		</>
	)
}
