type Type<T> = (s: unknown) => T

export const parseNumber = () => (input: unknown): number => {
	if (typeof input !== 'number') throw new Error()
	return input
}
export const parseString = () => (input: unknown): string => {
	if (typeof input !== 'string') throw new Error()
	return input
}
export const parseArray = <T>(item: Type<T>) => (input: unknown): T[] => {
	if (!Array.isArray(input)) throw new Error()
	return input.map(item)
}
export const parseObject = <O extends { [k: string]: Type<unknown> }>(
	parse: O,
) => {
	return (input: unknown): { [P in keyof O]: ReturnType<O[P]> } => {
		if (typeof input !== 'object') throw new Error()
		return Object.fromEntries(
			Object.entries(parse).map(([k, v]) => [k, v((input as any)[k])]),
		) as any
	}
}

export const parseApi = parseObject
