const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	target: 'node',
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.js', '.ts'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	entry: path.resolve(__dirname, './src/index.ts'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '../dist/server'),
	},
}
