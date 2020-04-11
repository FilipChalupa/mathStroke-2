import * as React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { routes } from '../routes.ts'
import { useUpdateTitleOnMount } from '../useUpdateTitleOnMount.ts'

export const JoinGame: React.SFC = () => {
	useUpdateTitleOnMount('Join game')
	return (
		<>
			<Typography variant="h4" align="center">
				<Link to={routes.homepage}>Join game</Link>
			</Typography>
		</>
	)
}
