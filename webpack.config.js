//Here we get the absolute path to the file
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/js/index.js', './src/sass/index.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],

	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		},
	  	{
			test: /\.scss$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: 'css/[name].css',
					}
				},
				{
					loader: 'extract-loader'
				},
				{
					loader: 'css-loader?-url'
				},
				{
					loader: 'postcss-loader'
				},
				{
					loader: 'sass-loader'
				}
			]
		}
	  ],
	},
};