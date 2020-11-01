import { Button, TextField, useMediaQuery } from '@material-ui/core'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { levelSubmitSolutionStartAction } from '../actions/level'
import { useStateSelector } from '../useStateSelector'
import { Battlefield } from './Battlefield'
import { BattlefieldSimplified } from './BattlefieldSimplified'
import { Tasks } from './Tasks'

export const Level: React.FunctionComponent = () => {
	const isSimplified = !useMediaQuery('(min-width: 700px')

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
			{isSimplified ? <BattlefieldSimplified /> : <Battlefield />}
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
