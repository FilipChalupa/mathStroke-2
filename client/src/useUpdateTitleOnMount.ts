import * as React from 'react'

const baseTitle = document.title

export function useUpdateTitleOnMount(title: string) {
	React.useEffect(() => {
		document.title = title ? `${title} | ${baseTitle}` : baseTitle
	}, [])
}
