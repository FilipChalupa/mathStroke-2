import { LinearProgress } from '@material-ui/core'
import * as React from 'react'
import { useStateSelector } from '../useStateSelector'
import './loadingIndicator.css'

export const LoadingIndicator: React.FunctionComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false)
	const { loading: isLoadingGames } = useStateSelector(
		(state) => state.publicGames,
	)
	const {
		isLoading: isLoadingGame,
		isConnected: isConnectedGame,
	} = useStateSelector((state) => state.game)

	React.useEffect(() => {
		const newIsLoading = isLoadingGames || isLoadingGame || !isConnectedGame

		// @TODO: always show loader for at leaset ~300ms

		if (isLoading !== newIsLoading) {
			setIsLoading(newIsLoading)
		}
	}, [isLoading, isLoadingGames, isLoadingGame])

	return (
		<div className="loadingIndicator">{isLoading && <LinearProgress />}</div>
	)
}
