import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react'
import { Color, colors, defaultColor } from 'utilities'

type Value = {
	name: string
	color: Color
	setName: (newName: string) => void
	setColor: (newColor: (typeof colors)[number]) => void
}

const context = createContext<Value>({
	name: '',
	color: defaultColor,
	setName: () => {},
	setColor: () => {},
})

export const PlayerProvider: FunctionComponent<{ children: ReactNode }> = ({
	children,
}) => {
	const [name, setName] = useState('')
	const [color, setColor] = useState<Color>(defaultColor)

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
