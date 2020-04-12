import { useLocation } from 'react-router-dom'

export function useLocationHash() {
	const location = useLocation()
	return location.hash.substr(1)
}
