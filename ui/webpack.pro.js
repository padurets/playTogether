const path = require('path');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackCommonConfig = require("../webpack.common.js");
const dirSrc = path.resolve(__dirname, './src');
const dirDist = path.resolve(__dirname, './dist');

const webpackDevConfig = {
	entry: `${dirSrc}/App.tsx`,
	mode: 'production',
	output: {
		path: dirDist,
		filename: "static/[name].js",
		publicPath: `/`
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${dirSrc}/assets/tpls/index.pug`,
			filename: "index.html"
		})
	]
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);