const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssExtract = new ExtractTextPlugin({
	filename: "cachu-slider.css"
});

const dev = process.env.NODE_ENV
	? process.env.NODE_ENV == "production"
		? true
		: false
	: false;

module.exports = {
	entry: ["babel-polyfill", "./src/js/index.js"],
	output: {
		path: __dirname,
		filename: "cachu-slider.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				use: cssExtract.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "sass-loader"],
					publicPath: "../"
				})
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "file-loader",
				options: {
					name: "[name].[hash:7].[ext]",
					outputPath: "fonts/"
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							name: "[name].[hash:7].[ext]",
							outputPath: "img/"
						}
					},
					{
						loader: "img-loader",
						options: {
							enabled: !dev
						}
					}
				]
			},
			{
				test: /\.(svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[hash:7].[ext]",
					outputPath: "svg/"
				}
			}
		]
	},
	plugins: [
		cssExtract,
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	externals: {},
	resolve: {}
};
