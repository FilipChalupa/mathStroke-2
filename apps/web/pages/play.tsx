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
import { PlayConnection, createPlayConnection } from '../utilities/connection'
import { useShare } from '../utilities/useShare'

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
	const [watchersCount, setWatchersCount] = useState(0)
	const playerName = usePlayerName()
	const playerColor = usePlayerColor()
	const [players, setPlayers] = useState<
		Array<{
			id: string
			name: string
			color: string
		}>
	>([])

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
				console.log({ message })
				if (message.role === 'watch') {
					if (message.type === 'updateWatchersCount') {
						setWatchersCount(message.count)
					} else if (message.type === 'addPlayer') {
						setPlayers((players) => [
							...players,
							{
								id: message.id,
								name: message.name,
								color: message.color,
							},
						])
					} else if (message.type === 'removePlayer') {
						setPlayers((players) =>
							players.filter((player) => player.id !== message.id),
						)
					} else if (message.type === 'updatePlayerInformation') {
						setPlayers((players) =>
							players.map((player) =>
								player.id === message.id
									? {
											...player,
											name: message.name,
											color: message.color,
									  }
									: player,
							),
						)
					} else {
						assertNever(message)
					}
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
	}, [playerColor, playerName, reload, roomId])

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
			<div>Spectators count: {watchersCount}</div>
			{players.map((player) => (
				<div key={player.id}>
					{player.name} ({player.color})
				</div>
			))}
		</>
	)
}
