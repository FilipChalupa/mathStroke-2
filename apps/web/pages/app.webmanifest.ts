import WebmanifestPage, { createGetServerSideProps } from 'nextjs-webmanifest'

export default WebmanifestPage

export const getServerSideProps = createGetServerSideProps({
	name: 'mathStroke',
	short_name: 'mathStroke',
	description: 'Practise your math skills.',
	start_url: '/',
	display: 'standalone',
	theme_color: '#2196f3',
	background_color: '#000000',
	lang: 'en',
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
})
