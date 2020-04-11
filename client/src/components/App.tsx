import * as React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from '../routes'
import { Homepage } from './Homepage'
import { NewGame } from './NewGame'
import { JoinGame } from './JoinGame'
import { Game } from './Game'

export const App: React.SFC = () => (
	<ThemeProvider>
		<Router>
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
		</Router>
	</ThemeProvider>
)
