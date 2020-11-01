import { getCurrentTimestamp } from '../../common/getCurrentTimestamp'
import { useStateSelector } from './useStateSelector'

export const useServerTime = () => {
	const { serverOffset } = useStateSelector((state) => state.time)
	return getCurrentTimestamp() + serverOffset
}
