import { blue, green, red } from '@mui/material/colors'
import { assertNever } from './assertNever'

export const colors = ['red', 'green', 'blue'] as const

export const defaultColor = colors[0]
export type Color = (typeof colors)[number]

export const colorToHex = (color: Color): `#${string}` => {
	switch (color) {
		case 'red':
			return red[500]
		case 'green':
			return green[500]
		case 'blue':
			return blue[500]
	}
	assertNever(color)
}
