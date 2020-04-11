import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlCommonConfig = {
	title: 'mathStroke 2',
	scriptLoading: 'defer',
}

const htmls = ['.', 'new-game', 'join-game', 'game'].map(
	(path) =>
		new HtmlWebpackPlugin({
			...htmlCommonConfig,
			filename: `${path}/index.html`,
		}),
)

module.exports = {
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
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
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
		],
	},
	entry: path.resolve(__dirname, './src/index.tsx'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist/public'),
		publicPath: '/',
	},
	plugins: [...htmls],
}
