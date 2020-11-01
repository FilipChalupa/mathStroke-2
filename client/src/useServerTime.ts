import { useStateSelector } from './useStateSelector'

export const useServerTime = () => {
	const { serverOffset } = useStateSelector((state) => state.time)
	return Date.now() + serverOffset
}
