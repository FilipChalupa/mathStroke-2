import { ServerRooms } from 'messages'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useMirrorLoading } from 'shared-loading-indicator'
import { assertNever } from 'utilities'
import { Rooms, RoomsProps } from '../components/Rooms'
import { RoomsConnection, createRoomsConnection } from '../utilities/connection'

export default function Web() {
	const [connection, setConnection] = useState<RoomsConnection | null>(null)

	useEffect(() => {
		const connection = createRoomsConnection(() => {
			setConnection(connection)
		})

		return () => {
			connection.close()
		}
	}, [])

	useMirrorLoading(connection === null)

	return (
		<div>
			<h1>Web</h1>
			{connection && <In connection={connection} />}
		</div>
	)
}

const In: FunctionComponent<{ connection: RoomsConnection }> = ({
	connection,
}) => {
	const [rooms, setRooms] = useState<RoomsProps['rooms']>([])

	useEffect(() => {
		const handleMessage = (message: ServerRooms.AnyMessage) => {
			console.log('Message received', message.type)
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

		return () => {
			connection.removeMessageListener(handleMessage)
		}
	}, [connection])

	const handleRequestNewRoom = useCallback(async () => {
		connection.action('requestNewRoom', {
			name: 'New Room ' + Math.round(Math.random() * 1000),
		})
		await new Promise((resolve) => setTimeout(resolve, 1000)) // @TODO: await new room information
	}, [connection])

	return <Rooms onRequestNewRoom={handleRequestNewRoom} rooms={rooms} />
}
