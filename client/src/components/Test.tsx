import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../reducers'
import { numberRequestStartAction } from '../actions'

export const Test: React.SFC = () => {
	const data = useSelector((state: State) => state.numberCollection)
	const dispatch = useDispatch()
	return (
		<div>
			Test
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				type="button"
				onClick={() => dispatch(numberRequestStartAction())}
			>
				Do
			</button>
		</div>
	)
}
