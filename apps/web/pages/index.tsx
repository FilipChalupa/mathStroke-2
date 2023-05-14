import { Container, Typography } from '@mui/material'
import { ServerRooms } from 'messages'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { assertNever } from 'utilities'
import { PlayerCustomizer } from '../components/PlayerCustomizer'
import { Rooms, RoomsProps } from '../components/Rooms'
import { RoomsConnection, createRoomsConnection } from '../utilities/connection'

export default function Web() {
	const [rooms, setRooms] = useState<RoomsProps['rooms']>([])
	const [connection, setConnection] = useState<RoomsConnection | null>(null)
	const { reload } = useRouter()

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
		const handleOpen = () => {
			setConnection(connection)

			const handleMessage = (message: ServerRooms.AnyMessage) => {
				if (message.type === 'addRoomAnnouncement') {
					setRooms((rooms) => [
						...rooms,
						{
							id: message.id,
							name: message.name,
							playerCount: message.playerCount,
						},
					])
				} else if (message.type === 'removeRoomAnnouncement') {
					setRooms((rooms) => rooms.filter((room) => room.id !== message.id))
				} else if (message.type === 'updateRoomPlayerCount') {
					setRooms((rooms) =>
						rooms.map((room) =>
							room.id === message.id
								? {
										...room,
										playerCount: message.playerCount,
								  }
								: room,
						),
					)
				} else {
					assertNever(message)
				}
			}
			connection.addMessageListener(handleMessage)
		}
		const handleCloseFromServer = () => {
			reload()
		}
		const connection = createRoomsConnection(handleOpen, handleCloseFromServer)

		return () => {
			connection.close()
			setConnection(null)
		}
	}, [reload])

	useMirrorLoading(connection === null)

	return (
		<>
			{/* @TODO: remove <br /> */}
			<br />
			<br />
			<Container maxWidth="sm">
				<Typography variant="h4" component="h1" align="center" gutterBottom>
					mathStroke
				</Typography>
			</Container>
			<PlayerCustomizer />
			{/* @TODO: proper spacing */}
			<br />
			{connection && (
				<Rooms onRequestNewRoom={handleRequestNewRoom} rooms={rooms} />
			)}
			{/* @TODO: remove <br /> */}
			<br />
			<br />
		</>
	)
}
