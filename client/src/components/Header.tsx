import {
	AppBar,
	Link as MaterialLink,
	Toolbar,
	Typography,
} from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

export const Header: React.FunctionComponent = () => {
	return (
		<AppBar position="sticky" className="header">
			<Toolbar>
				<MaterialLink to={routes.homepage} component={Link} color="inherit">
					<Typography variant="h5">Math Stroke</Typography>
				</MaterialLink>
			</Toolbar>
		</AppBar>
	)
}
