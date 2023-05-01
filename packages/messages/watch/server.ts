export namespace ServerWatch {
	export type AddWatcherAnnouncement = {
		type: 'addWatcherAnnouncement'
		id: string
	}

	export type LeftWatcherAnnouncement = {
		type: 'leftWatcherAnnouncement'
		id: string
	}

	export type AnyMessage = AddWatcherAnnouncement | LeftWatcherAnnouncement
}
