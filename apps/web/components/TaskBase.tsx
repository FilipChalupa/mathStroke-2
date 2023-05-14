import type { FunctionComponent, ReactNode } from 'react'
import { Progress } from './Progress'
import styles from './TaskBase.module.css'
import { TaskWrapper } from './TaskWrapper'

export interface TaskBaseProps {
	label: string
	destroyedBy: ReactNode
	createdAt: number
	stoppedAt: number | null
	timeToImpactMilliseconds: number
	other?: ReactNode
}

export const TaskBase: FunctionComponent<TaskBaseProps> = ({
	label,
	destroyedBy,
	createdAt,
	stoppedAt,
	timeToImpactMilliseconds,
	other,
}) => {
	return (
		<TaskWrapper isStopped={stoppedAt !== null}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					{other && <div className={styles.other}>{other}</div>}
					<div className={styles.label}>{label}</div>
					{destroyedBy && <div className={styles.destroyer}>{destroyedBy}</div>}
				</div>
				<Progress
					startAt={createdAt}
					stoppedAt={stoppedAt}
					duration={timeToImpactMilliseconds}
				/>
			</div>
		</TaskWrapper>
	)
}
