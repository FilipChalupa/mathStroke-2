import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button, Container } from '@mui/material'
import { ServerWatch } from 'messages'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { homeHref } from '../../server/src/utilities/href'
import { JoinBadge } from '../components/JoinBadge'
import { Room } from '../components/Room'
import { WatchConnection, createWatchConnection } from '../utilities/connection'
import { useRoomIdFromUrlHash } from '../utilities/useRoomIdFromUrlHash'
import { useWatchState } from '../utilities/useWatchState'

export default function Watch() {
	const roomId = useRoomIdFromUrlHash([homeHref()])

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
			<Room watchState={watchState} />
			{watchState.roomState.state === 'lobby' && (
				<Container maxWidth="sm">
					<JoinBadge roomId={roomId} />
				</Container>
			)}
			<Container maxWidth="sm">
				<br />
				<br />
				<br />
				<br />
				<Button
					variant="contained"
					LinkComponent={Link}
					href={homeHref()}
					endIcon={<ExitToAppIcon />}
				>
					Leave
				</Button>{' '}
				Watch {connection !== null && 'connected'}
			</Container>
		</>
	)
}
