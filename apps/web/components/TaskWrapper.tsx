import clsx from 'clsx'
import type { FunctionComponent, ReactNode } from 'react'
import styles from './TaskWrapper.module.css'

export interface TaskWrapperProps {
	isDestroyed: boolean
	children: ReactNode
}

export const TaskWrapper: FunctionComponent<TaskWrapperProps> = ({
	isDestroyed,
	children,
}) => {
	return (
		<div className={clsx(styles.wrapper, isDestroyed && styles.is_destroyed)}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
