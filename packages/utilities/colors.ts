export const colors = ['red', 'green', 'blue'] as const

export const defaultColor = colors[0]
export type Color = (typeof colors)[number]
