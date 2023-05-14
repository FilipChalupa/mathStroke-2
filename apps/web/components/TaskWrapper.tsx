import clsx from 'clsx'
import type { FunctionComponent, ReactNode } from 'react'
import styles from './TaskWrapper.module.css'

export interface TaskWrapperProps {
	isStopped: boolean
	children: ReactNode
}

export const TaskWrapper: FunctionComponent<TaskWrapperProps> = ({
	isStopped,
	children,
}) => {
	return (
		<div className={clsx(styles.wrapper, isStopped && styles.is_stopped)}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
