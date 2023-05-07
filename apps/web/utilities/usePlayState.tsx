import { ClientPlay, ServerPlay } from 'messages'
import { useCallback, useMemo, useState } from 'react'
import { assertNever } from 'utilities'

export type Player = ReturnType<typeof usePlay>['player']

export const usePlay = (
	sendAction: (message: ClientPlay.AnyPlayOnlyMessage) => void,
) => {
	const [jammed, setJammed] = useState(false) // @TODO
	const [id, setId] = useState('')

	const handleMessage = useCallback(
		(message: ServerPlay.AnyPlayMessage) => {
			if (message.type === 'setId') {
				setId(message.id)
			} else {
				assertNever(message.type)
			}
		},
		[
			/* This must stay empty otherwise it will cause reconnects */
		],
	)

	const sendSolution = useCallback((solution: string) => {
		console.log('@TODO: send solution', solution)
	}, [])
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
	const state = useMemo(() => ({ id, jammed }), [id, jammed])

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
