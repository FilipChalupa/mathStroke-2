import * as React from 'react'
import { ThemeProvider } from './ThemeProvider.tsx'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { routes } from '../routes.ts'
import { Homepage } from './Homepage.tsx'
import { NewGame } from './NewGame.tsx'
import { JoinGame } from './JoinGame.tsx'
import { Game } from './Game.tsx'

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
