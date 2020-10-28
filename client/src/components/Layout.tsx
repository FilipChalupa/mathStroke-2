import * as React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { routes } from '../routes'
import { Game } from './Game'
import { Header } from './Header'
import { Homepage } from './Homepage'
import { JoinGame } from './JoinGame'
import './layout.css'
import { LoadingIndicator } from './LoadingIndicator'
import { NewGame } from './NewGame'

export const Layout: React.FunctionComponent = () => {
	const isGameRoute = useRouteMatch(routes.game)

	return (
		<div className="layout">
			<LoadingIndicator />
			{!isGameRoute && <Header />}
			<div className="layout-content">
				<Switch>
					{Object.entries(routes).map(([name, path]) => (
						<Route path={path} key={name}>
							{name === 'homepage' ? (
								<Homepage />
							) : name === 'newGame' ? (
								<NewGame />
							) : name === 'joinGame' ? (
								<JoinGame />
							) : name === 'game' ? (
								<Game />
							) : null}
						</Route>
					))}
				</Switch>
			</div>
		</div>
	)
}
