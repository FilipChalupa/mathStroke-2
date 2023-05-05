export const colors = ['red', 'blue'] as const

export type Color = (typeof colors)[number]
