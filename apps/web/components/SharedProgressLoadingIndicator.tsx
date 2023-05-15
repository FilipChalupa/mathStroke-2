import { LinearProgress } from '@mui/material'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'
import { useSharedLoading } from 'shared-loading-indicator'
import styles from './SharedProgressLoadingIndicator.module.css'

export const SharedProgressLoadingIndicator: FunctionComponent = () => {
	const isLoading = useSharedLoading()

	return (
		<div className={clsx(styles.wrapper, isLoading && styles.is_loading)}>
			<LinearProgress />
		</div>
	)
}
