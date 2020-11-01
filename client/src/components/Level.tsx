import { useMediaQuery } from '@material-ui/core'
import * as React from 'react'
import { Battlefield } from './Battlefield'
import { BattlefieldSimplified } from './BattlefieldSimplified'

export const Level: React.FunctionComponent = () => {
	const isSimplified = !useMediaQuery('(min-width: 700px')

	return isSimplified ? <BattlefieldSimplified /> : <Battlefield />
}
