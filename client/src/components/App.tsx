import * as React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../store'
import { Layout } from './Layout'
import { ThemeProvider } from './ThemeProvider'

export const App: React.FunctionComponent = () => (
	<ReduxProvider store={store}>
		<ThemeProvider>
			<Router>
				<Layout />
			</Router>
		</ThemeProvider>
	</ReduxProvider>
)
