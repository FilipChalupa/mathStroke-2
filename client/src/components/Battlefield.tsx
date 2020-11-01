import * as React from 'react'
import { Players } from './Players'
import { Tasks } from './Tasks'

export interface BattlefieldProps {}

export const Battlefield: React.FunctionComponent<BattlefieldProps> = ({}) => {
	return (
		<div className="battlefield">
			<Tasks />
			<Players />
		</div>
	)
}
