import * as React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from '../routes'
import { Homepage } from './Homepage'
import { NewGame } from './NewGame'
import { JoinGame } from './JoinGame'
import { Game } from './Game'

import { store } from '../store'
import { Provider as ReduxProvider } from 'react-redux'

export const App: React.SFC = () => (
	<ReduxProvider store={store}>
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
	</ReduxProvider>
)
