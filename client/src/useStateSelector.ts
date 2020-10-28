import { useSelector } from 'react-redux'
import { State } from './reducers'

export function useStateSelector<T>(selector: (state: State) => T) {
	return useSelector(selector)
}
