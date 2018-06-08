const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const version = require('./package.json').version;


const banner =
"/**!\n" +
" * Cachu Slider v" + version + "\n" +
" * Copyright (c) " + (new Date().getFullYear()) + " Mystro Ken <mystroken@gmail.com>\n" +
" * MIT License\n" +
" */\n";


const cssExtract = new ExtractTextPlugin({
	filename: "cachu-slider.css"
});

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
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
							enabled: true
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
		//new BundleAnalyzerPlugin(),
		new webpack.BannerPlugin({
			banner,
			raw: true
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: false,
				uglifyOptions: {
					ecma: 6,
					warnings: false,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_classnames: true,
					keep_fnames: false,
					safari10: false
				}
			})
		]
	},
	externals: {},
	resolve: {}
};
