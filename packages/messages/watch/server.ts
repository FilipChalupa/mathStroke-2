export namespace ServerWatch {
	export type UpdateWatchersCount = {
		type: 'updateWatchersCount'
		count: number
	}

	export type AnyMessage = UpdateWatchersCount
}
