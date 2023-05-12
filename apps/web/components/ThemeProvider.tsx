import {
	ThemeProvider as MuiThemeProvider,
	createTheme,
	useMediaQuery,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { ReactNode, useMemo } from 'react'

export const primaryColor = blue
export const themeColor = primaryColor[500]

export const ThemeProvider: React.FunctionComponent<{
	children: ReactNode
}> = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
					primary: primaryColor,
				},
			}),
		[prefersDarkMode],
	)

	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
