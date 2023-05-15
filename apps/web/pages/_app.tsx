import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SharedLoadingIndicatorContextProvider } from 'shared-loading-indicator'
import { PageNavigationLoadingTracker } from '../components/PageNavigationLoadingTracker'
import { PlayerProvider } from '../components/PlayerProvider'
import { SharedProgressLoadingIndicator } from '../components/SharedProgressLoadingIndicator'
import { ThemeProvider } from '../components/ThemeProvider'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<CssBaseline />
			<SharedLoadingIndicatorContextProvider>
				<PlayerProvider>
					<Head>
						<title>mathStroke</title>
						{/* @TODO: fix white flash in dark theme */}
						<meta name="color-scheme" content="light dark" />
						<link rel="icon" href="/app-icon.svg" type="image/svg+xml" />
						<link rel="manifest" href="/app.webmanifest" />
					</Head>
					<PageNavigationLoadingTracker />
					<SharedProgressLoadingIndicator />
					<Component {...pageProps} />
				</PlayerProvider>
			</SharedLoadingIndicatorContextProvider>
		</ThemeProvider>
	)
}
