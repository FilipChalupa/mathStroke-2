import { useEffect, useMemo, useState } from 'react'

export const useShare = () => {
	const [canShare, setCanShare] = useState(false)

	useEffect(() => {
		if ('share' in navigator) {
			setCanShare(true)
		}
	}, [])

	return useMemo(() => {
		if (!canShare) {
			return null
		}
		return async (data: ShareData) => {
			try {
				await navigator.share(data)
			} catch (error) {
				console.warn(error)
			}
		}
	}, [canShare])
}
