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
		return (data: ShareData) => {
			navigator.share(data)
		}
	}, [canShare])
}
