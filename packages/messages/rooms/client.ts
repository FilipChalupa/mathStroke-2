export namespace ClientRooms {
	export type RequestNewRoom = {
		type: 'requestNewRoom'
		name: string
	}

	export type AnyMessage = RequestNewRoom
}
