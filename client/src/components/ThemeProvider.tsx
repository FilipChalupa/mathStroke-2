import * as React from 'react'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

export const ThemeProvider: React.FC = (props) => {
	const media = React.useMemo(
		() => window.matchMedia('(prefers-color-scheme: dark)'),
		[],
	)
	const [isDark, setIsDark] = React.useState(media.matches)

	React.useEffect(() => {
		const onChange = () => {
			setIsDark(media.matches)
		}
		media.addListener(onChange)
		return () => {
			media.removeListener(onChange)
		}
	}, [media])

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: isDark ? 'dark' : 'light',
				},
			}),
		[isDark],
	)

	return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}
