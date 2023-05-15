import { Link } from '@mui/material'
import NextLink from 'next/link'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import QRCode from 'react-qr-code'
import { playHref } from '../../server/src/utilities/href'
import styles from './JoinBadge.module.css'

export interface JoinBadgeProps {
	roomId: string
}

export const JoinBadge: FunctionComponent<JoinBadgeProps> = ({ roomId }) => {
	const [baseUrl, setBaseUrl] = useState('')
	useEffect(() => {
		setBaseUrl(window.location.origin)
	}, [])

	const { shortUrl, fullUrl } = useMemo(() => {
		const fullUrl = `${baseUrl}${playHref(roomId)}`
		const shortUrl = fullUrl.substring(fullUrl.indexOf('://') + 3)
		return {
			shortUrl: shortUrl.startsWith('www.') ? shortUrl.substring(4) : shortUrl,
			fullUrl,
		}
	}, [baseUrl, roomId])

	return (
		<div className={styles.wrapper}>
			<div className={styles.qr}>
				<QRCode
					className={styles.qr_in}
					size={256}
					value={fullUrl}
					viewBox="0 0 256 256"
				/>
			</div>
			<div className={styles.link}>
				<Link
					component={NextLink}
					className={styles.link}
					href={fullUrl}
					color="inherit"
					underline="hover"
				>
					{shortUrl}
				</Link>
			</div>
		</div>
	)
}
