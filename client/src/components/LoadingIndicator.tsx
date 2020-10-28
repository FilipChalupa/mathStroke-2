import { LinearProgress } from '@material-ui/core'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../reducers'
import './loadingIndicator.css'

export const LoadingIndicator: React.FunctionComponent = () => {
	const [isLoading, setIsLoading] = React.useState(false)
	const { loading: isLoadingGames } = useSelector(
		(state: State) => state.publicGames,
	)

	React.useEffect(() => {
		const newIsLoading = isLoadingGames

		// @TODO: always show loader for at leaset ~300ms

		if (isLoading !== newIsLoading) {
			setIsLoading(newIsLoading)
		}
	}, [isLoading, isLoadingGames])

	return (
		<div className="loadingIndicator">{isLoading && <LinearProgress />}</div>
	)
}
