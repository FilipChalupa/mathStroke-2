import { AppProps } from 'next/app'
import Head from 'next/head'
import {
	SharedLoadingIndicatorContextProvider,
	SharedProgressLoadingIndicator,
} from 'shared-loading-indicator'
import { PageNavigationLoadingTracker } from '../components/PageNavigationLoadingTracker'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SharedLoadingIndicatorContextProvider>
			<Head>
				<title>mathStroke</title>
			</Head>
			<PageNavigationLoadingTracker />
			<SharedProgressLoadingIndicator />
			<Component {...pageProps} />
		</SharedLoadingIndicatorContextProvider>
	)
}
