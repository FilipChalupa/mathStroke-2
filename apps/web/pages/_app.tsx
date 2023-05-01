import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import {
	SharedLoadingIndicatorContextProvider,
	SharedProgressLoadingIndicator,
} from 'shared-loading-indicator'
import { PageNavigationLoadingTracker } from '../components/PageNavigationLoadingTracker'
import { ThemeProvider } from '../components/ThemeProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<CssBaseline />
			<SharedLoadingIndicatorContextProvider>
				<Head>
					<title>mathStroke</title>
					{/* @TODO: fix white flash in dark theme */}
					<meta name="color-scheme" content="light dark" />{' '}
				</Head>
				<PageNavigationLoadingTracker />
				<SharedProgressLoadingIndicator />
				<Component {...pageProps} />
			</SharedLoadingIndicatorContextProvider>
		</ThemeProvider>
	)
}
