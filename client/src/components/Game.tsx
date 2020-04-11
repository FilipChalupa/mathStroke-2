import * as React from 'react'
import { Typography } from '@material-ui/core'
import { routes } from '../routes.ts'
import { Link } from 'react-router-dom'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount.ts'

export const Game: React.SFC = () => {
	useUpdateTitleOnMount('Game')
	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Game</Link>
			</Typography>
		</>
	)
}
