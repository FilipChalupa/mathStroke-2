import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'
import { ServerWatch } from 'messages'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { homeHref } from '../../server/src/utilities/href'
import { Room } from '../components/Room'
import { WatchConnection, createWatchConnection } from '../utilities/connection'
import { useWatchState } from '../utilities/useWatchState'

export default function Watch() {
	const router = useRouter()
	const roomId = useMemo(() => {
		if (typeof router.query.id === 'string') {
			return router.query.id
		}
		return null
	}, [router.query.id])

	useEffect(() => {
		if (roomId === null && router.isReady) {
			router.push(homeHref())
		}
	}, [roomId, router])

	useMirrorLoading(roomId === null)

	if (roomId === null) {
		return null
	}

	return <WatchIn roomId={roomId} />
}

const WatchIn: FunctionComponent<{ roomId: string }> = ({ roomId }) => {
	const [connection, setConnection] = useState<WatchConnection | null>(null)
	const { reload } = useRouter()
	const { handleMessage: handleWatchMessage, state: watchState } =
		useWatchState()

	useEffect(() => {
		const handleOpen = () => {
			setConnection(connection)

			const handleMessage = (message: ServerWatch.AnyMessage) => {
				handleWatchMessage(message)
			}
			connection.addMessageListener(handleMessage)
		}
		const handleCloseFromServer = () => {
			// @TODO: detect intentional rejections
			reload()
		}
		const connection = createWatchConnection(
			roomId,
			handleOpen,
			handleCloseFromServer,
		)

		return () => {
			connection.close()
			setConnection(null)
		}
	}, [handleWatchMessage, reload, roomId])

	useMirrorLoading(connection === null)

	return (
		<>
			Watch {connection !== null && 'connected'}
			<Button
				variant="contained"
				LinkComponent={Link}
				href={homeHref()}
				endIcon={<ExitToAppIcon />}
			>
				Leave
			</Button>
			<Room watchState={watchState} />
		</>
	)
}
