import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, './src/index.ts'),
	mode: 'development', // @TODO: change to production in production mode
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist/public'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'mathStroke 2',
			scriptLoading: 'defer',
		}),
	],
}
