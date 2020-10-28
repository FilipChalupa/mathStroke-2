import { LinearProgress } from '@material-ui/core'
import cn from 'classnames'
import * as React from 'react'
import { useStateSelector } from '../useStateSelector'
import './loadingIndicator.css'

export const LoadingIndicator: React.FunctionComponent = () => {
	const { loading: isLoadingGames } = useStateSelector(
		(state) => state.publicGames,
	)
	const { isLoading: isLoadingGame } = useStateSelector((state) => state.game)

	const isLoading = isLoadingGames || isLoadingGame

	return (
		<div className="loadingIndicator">
			<LoadingIndicatorInner active={isLoading} />
		</div>
	)
}

export const LoadingIndicatorInner: React.FunctionComponent<{
	active: boolean
}> = ({ active }) => {
	const [wearOffActive, setWearOffActive] = React.useState(false)
	const wearOffTimer = React.useRef<null | number>(null)

	React.useEffect(() => {
		if (active) {
			setWearOffActive(true)
			if (wearOffTimer.current) {
				window.clearTimeout(wearOffTimer.current)
			}
			wearOffTimer.current = window.setTimeout(() => {
				setWearOffActive(false)
			}, 300)
		}
	}, [active])

	return (
		<div
			className={cn(
				'loadingIndicator-in',
				(active || wearOffActive) && 'is-active',
			)}
		>
			<LinearProgress />
		</div>
	)
}
