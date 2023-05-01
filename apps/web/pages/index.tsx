import { Typography } from '@mui/material'
import { ServerRooms } from 'messages'
import { useCallback, useEffect, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { assertNever } from 'utilities'
import { Rooms, RoomsProps } from '../components/Rooms'
import { RoomsConnection, createRoomsConnection } from '../utilities/connection'

export default function Web() {
	const [rooms, setRooms] = useState<RoomsProps['rooms']>([])
	const [connection, setConnection] = useState<RoomsConnection | null>(null)

	const handleRequestNewRoom = useCallback(
		async (name: string) => {
			connection?.action({
				type: 'requestNewRoom',
				name,
			})
		},
		[connection],
	)

	useEffect(() => {
		const connection = createRoomsConnection(() => {
			setConnection(connection)

			const handleMessage = (message: ServerRooms.AnyMessage) => {
				if (message.type === 'addRoomAnnouncement') {
					setRooms((rooms) => [
						...rooms,
						{
							id: message.id,
							name: message.name,
						},
					])
				} else if (message.type === 'removeRoomAnnouncement') {
					setRooms((rooms) => rooms.filter((room) => room.id !== message.id))
				} else {
					assertNever(message)
				}
			}
			connection.addMessageListener(handleMessage)
		})

		return () => {
			connection.close()
			setConnection(null)
		}
	}, [])

	useMirrorLoading(connection === null)

	return (
		<>
			<Typography variant="h2" component="h1">
				Web
			</Typography>
			{connection && (
				<Rooms onRequestNewRoom={handleRequestNewRoom} rooms={rooms} />
			)}
		</>
	)
}
