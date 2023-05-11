import type { GetServerSideProps } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

function Webmanifest() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const data: WebAppManifest = {
		name: 'mathStroke',
		short_name: 'mathStroke',
		description: 'Practise your math skills.',
		start_url: '/',
		display: 'standalone',
		theme_color: '#2196f3',
		background_color: '#000000',
		lang: 'en',
		// @ts-ignore Id is not in the official WebAppManifest type, but it is in the specification.
		id: 'en',
		icons: [
			{
				src: '/app-icon.svg',
				sizes: '256x256',
				type: 'image/svg+xml',
				purpose: 'any',
			},
			{
				src: '/app-icon.svg',
				sizes: '256x256',
				type: 'image/svg+xml',
				purpose: 'maskable',
			},
		],
	}
	res.setHeader('Content-Type', 'application/manifest+json')
	res.write(JSON.stringify(data))
	res.end()

	return {
		props: {},
	}
}

export default Webmanifest
