const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const version = require('./package.json').version;


const banner =
"/*!\n" +
" * Cachu Slider v" + version + "\n" +
" * Copyright (c) " + (new Date().getFullYear()) + " Mystro Ken <mystroken@gmail.com>\n" +
" * MIT License\n" +
" */\n";


module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "cachu-slider.min.js",
		library: "Cachu",
		libraryTarget: "assign",
		libraryExport: "default"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin({
			banner,
			raw: true
		}),
    new UnminifiedWebpackPlugin()
		//new BundleAnalyzerPlugin()
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
