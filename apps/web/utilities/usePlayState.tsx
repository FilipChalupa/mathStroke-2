import { ClientPlay, ServerPlay } from 'messages'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { assertNever } from 'utilities'
import { WatchState } from './useWatchState'

export type Player = ReturnType<typeof usePlayState>['player']

export const usePlayState = (
	sendAction: (message: ClientPlay.AnyPlayOnlyMessage) => void,
	roomState: WatchState['roomState']['state'],
) => {
	const [waitingForHitConfirmation, setWaitingForHitConfirmation] =
		useState(false)
	const [jammed, setJammed] = useState(false) // @TODO
	const [id, setId] = useState('')

	const handleMessage = useCallback(
		(message: ServerPlay.AnyPlayMessage) => {
			if (message.type === 'setId') {
				setId(message.id)
			} else if (message.type === 'confirmHit') {
				setWaitingForHitConfirmation(false)
			} else {
				assertNever(message)
			}
		},
		[
			/* This must stay empty otherwise it will cause reconnects */
		],
	)

	useEffect(() => {
		if (roomState === 'level') {
			return () => {
				setWaitingForHitConfirmation(false)
				setJammed(false)
			}
		}
	}, [roomState])

	const sendSolution = useCallback(
		(solution: string) => {
			setWaitingForHitConfirmation(true)
			sendAction({
				type: 'sendSolution',
				solution,
			})
		},
		[sendAction],
	)
	const changeReady = useCallback(
		(ready: boolean) => {
			sendAction({
				type: 'setReady',
				ready,
			})
		},
		[sendAction],
	)

	const action = useMemo(
		() => ({ sendSolution, changeReady }),
		[changeReady, sendSolution],
	)
	const state = useMemo(
		() => ({ id, jammed, waitingForHitConfirmation }),
		[id, jammed, waitingForHitConfirmation],
	)

	return useMemo(
		() => ({
			handleMessage,
			player: {
				action,
				state,
			},
		}),
		[action, handleMessage, state],
	)
}
