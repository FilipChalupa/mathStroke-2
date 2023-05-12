import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export const useRoomIdFromUrlHash = (
	redirectIfNotSet?: Parameters<ReturnType<typeof useRouter>['replace']>,
) => {
	const router = useRouter()
	const [roomId, setRoomId] = useState<null | string>(null)
	const redirectInProgress = useRef(false)

	useEffect(() => {
		const hash = router.asPath.split('#')[1] ?? ''
		if (hash.length === 0) {
			if (redirectIfNotSet && !redirectInProgress.current) {
				redirectInProgress.current = true
				router.replace(...redirectIfNotSet)
			}
		} else {
			redirectInProgress.current = false
			setRoomId(hash)
		}
	}, [roomId, router, redirectIfNotSet])

	return roomId
}
