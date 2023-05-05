import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react'
import { Color, colors } from 'utilities'

type Value = {
	name: string
	color: Color
	setName: (newName: string) => void
	setColor: (newColor: (typeof colors)[number]) => void
}

const context = createContext<Value>({
	name: '',
	color: colors[0],
	setName: () => {},
	setColor: () => {},
})

export const PlayerProvider: FunctionComponent<{ children: ReactNode }> = ({
	children,
}) => {
	const [name, setName] = useState('')
	const [color, setColor] = useState<Color>(colors[0])

	const value = useMemo<Value>(
		() => ({
			name,
			color,
			setName: (newName) => {
				setName(newName)
			},
			setColor: (newColor) => {
				setColor(newColor)
			},
		}),
		[color, name],
	)

	return <context.Provider value={value}>{children}</context.Provider>
}

export const useSetPlayerName = () => useContext(context).setName
export const useSetPlayerColor = () => useContext(context).setColor
export const usePlayerName = () => useContext(context).name
export const usePlayerColor = () => useContext(context).color
