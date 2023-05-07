export type RoomState = {
	levelNumber: number
} & RoomStateSpecific

export type RoomStateSpecific =
	| {
			state: 'lobby'
	  }
	| {
			state: 'level'
			shield: number
	  }
