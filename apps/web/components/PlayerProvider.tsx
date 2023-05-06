import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useMemo,
} from 'react'
import { useStorageBackedState } from 'use-storage-backed-state'
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

const storage = 'sessionStorage' in globalThis ? sessionStorage : undefined

export const PlayerProvider: FunctionComponent<{ children: ReactNode }> = ({
	children,
}) => {
	const [name, setName] = useStorageBackedState('', 'playerName', storage)
	const [color, setColor] = useStorageBackedState<string>(
		defaultColor,
		'playerColor',
		storage,
	)

	const value = useMemo<Value>(
		() => ({
			name,
			color: colors.includes(color as Color) ? (color as Color) : defaultColor,
			setName: (newName) => {
				setName(newName)
			},
			setColor: (newColor: Color) => {
				setColor(newColor)
			},
		}),
		[color, name, setColor, setName],
	)

	return <context.Provider value={value}>{children}</context.Provider>
}

export const useSetPlayerName = () => useContext(context).setName
export const useSetPlayerColor = () => useContext(context).setColor
export const usePlayerName = () => useContext(context).name
export const usePlayerColor = () => useContext(context).color
