import { ServerPlay } from 'messages'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { homeHref } from '../../server/src/utilities/href'
import { PlayConnection, createPlayConnection } from '../utilities/connection'

export default function Play() {
	const router = useRouter()
	const roomId = useMemo(() => {
		if (typeof router.query.id === 'string') {
			return router.query.id
		}
		return null
	}, [router.query.id])

	useEffect(() => {
		if (roomId === null) {
			router.push(homeHref())
		}
	}, [roomId, router])

	if (roomId === null) {
		return null
	}

	return <PlayIn roomId={roomId} />
}

const PlayIn: FunctionComponent<{ roomId: string }> = ({ roomId }) => {
	const [connection, setConnection] = useState<PlayConnection | null>(null)

	useEffect(() => {
		const connection = createPlayConnection(roomId, () => {
			setConnection(connection)

			const handleMessage = (message: ServerPlay.AnyMessage) => {
				// @TODO
			}
			connection.addMessageListener(handleMessage)
		})

		return () => {
			connection.close()
			setConnection(null)
		}
	}, [roomId])

	useMirrorLoading(connection === null)

	return <>Play {connection !== null && 'connected'}</>
}
