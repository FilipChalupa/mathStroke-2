import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ShareIcon from '@mui/icons-material/Share'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Button } from '@mui/material'
import { ServerPlay } from 'messages'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { assertNever } from 'utilities'
import { homeHref, watchHref } from '../../server/src/utilities/href'
import { usePlayerColor, usePlayerName } from '../components/PlayerProvider'
import { Room } from '../components/Room'
import { PlayConnection, createPlayConnection } from '../utilities/connection'
import { useShare } from '../utilities/useShare'
import { useWatchState } from '../utilities/useWatchState'

export default function Play() {
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

	return <PlayIn roomId={roomId} />
}

const PlayIn: FunctionComponent<{ roomId: string }> = ({ roomId }) => {
	const [connection, setConnection] = useState<PlayConnection | null>(null)
	const { reload } = useRouter()
	const playerName = usePlayerName()
	const playerColor = usePlayerColor()

	const { handleMessage: handleWatchMessage, state: watchState } =
		useWatchState()

	useEffect(() => {
		const handleOpen = () => {
			setConnection(connection)

			connection.action({
				role: 'play',
				type: 'setPlayerInformation',
				name: playerName,
				color: playerColor,
			})

			const handleMessage = (message: ServerPlay.AnyMessage) => {
				if (message.role === 'watch') {
					handleWatchMessage(message)
				} else if (message.role === 'play') {
					// @TODO
				} else {
					assertNever(message)
				}
			}
			connection.addMessageListener(handleMessage)
		}
		const handleCloseFromServer = () => {
			// @TODO: detect intentional rejections
			reload()
		}
		const connection = createPlayConnection(
			roomId,
			handleOpen,
			handleCloseFromServer,
		)

		return () => {
			connection.close()
			setConnection(null)
		}
	}, [handleWatchMessage, playerColor, playerName, reload, roomId])

	useMirrorLoading(connection === null)

	const share = useShare()

	return (
		<>
			Play {connection !== null && 'connected'}
			<Button
				variant="contained"
				LinkComponent={Link}
				href={watchHref(roomId)}
				endIcon={<VisibilityIcon />}
			>
				Spectate
			</Button>{' '}
			<Button
				variant="contained"
				LinkComponent={Link}
				href={homeHref()}
				endIcon={<ExitToAppIcon />}
			>
				Leave
			</Button>
			{share !== null && (
				<>
					{' '}
					<Button
						variant="contained"
						type="button"
						onClick={() => {
							share({
								title: 'mathStroke invite',
								text: 'Join the game',
								url: window.location.href,
							})
						}}
						endIcon={<ShareIcon />}
					>
						Invite
					</Button>
				</>
			)}
			<Room watchState={watchState} />
		</>
	)
}
