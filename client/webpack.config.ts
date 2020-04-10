import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlCommonConfig = {
	title: 'mathStroke 2',
	scriptLoading: 'defer',
}

module.exports = {
	entry: path.resolve(__dirname, './src/index.ts'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist/public'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			...htmlCommonConfig,
		}),
		new HtmlWebpackPlugin({
			...htmlCommonConfig,
			title: `New game | ${htmlCommonConfig.title}`,
			filename: 'new-game/index.html',
		}),
		new HtmlWebpackPlugin({
			...htmlCommonConfig,
			title: `Join game | ${htmlCommonConfig.title}`,
			filename: 'join-game/index.html',
		}),
	],
}
