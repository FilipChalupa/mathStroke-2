import * as React from 'react'
import { Players } from './Players'
import { SolutionInput } from './SolutionInput'
import { Tasks } from './Tasks'

export interface BattlefieldProps {}

export const Battlefield: React.FunctionComponent<BattlefieldProps> = ({}) => {
	return (
		<div className="battlefield">
			<Tasks />
			<Players />
			<SolutionInput />
		</div>
	)
}
