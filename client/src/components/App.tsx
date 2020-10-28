import * as React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from '../routes'
import { store } from '../store'
import { Game } from './Game'
import { Homepage } from './Homepage'
import { JoinGame } from './JoinGame'
import { LoadingIndicator } from './LoadingIndicator'
import { NewGame } from './NewGame'
import { ThemeProvider } from './ThemeProvider'

export const App: React.SFC = () => (
	<ReduxProvider store={store}>
		<ThemeProvider>
			<Router>
				<LoadingIndicator />
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
