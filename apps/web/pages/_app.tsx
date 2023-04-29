import {
	SharedLoadingIndicatorContextProvider,
	SharedProgressLoadingIndicator,
} from 'shared-loading-indicator'

export default function MyApp({ Component, pageProps }) {
	return (
		<SharedLoadingIndicatorContextProvider>
			<SharedProgressLoadingIndicator />
			<Component {...pageProps} />
		</SharedLoadingIndicatorContextProvider>
	)
}
