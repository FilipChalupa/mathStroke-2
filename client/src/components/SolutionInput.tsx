import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { levelSubmitSolutionStartAction } from '../actions'
import { useStateSelector } from '../useStateSelector'

export interface SolutionInputProps {}

export const SolutionInput: React.FunctionComponent<SolutionInputProps> = ({}) => {
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
		<form className="solutionInput" onSubmit={onSubmit}>
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
