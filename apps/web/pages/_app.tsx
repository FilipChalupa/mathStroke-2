import {
	SharedLoadingIndicatorContextProvider,
	SharedProgressLoadingIndicator,
} from 'shared-loading-indicator'
import { PageNavigationLoadingTracker } from '../components/PageNavigationLoadingTracker'

export default function MyApp({ Component, pageProps }) {
	return (
		<SharedLoadingIndicatorContextProvider>
			<PageNavigationLoadingTracker />
			<SharedProgressLoadingIndicator />
			<Component {...pageProps} />
		</SharedLoadingIndicatorContextProvider>
	)
}
