const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
	dirs
} = require("./common.config.js");
const webpackCommonConfig = require("./webpack.common.js");

const webpackDevConfig = {
	entry: `${dirs.src}/index.js`,
	mode: 'production',
	output: {
		filename: "[hash].js",
		publicPath: `/`
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${dirs.src}/assets/tpls/index.pug`,
			filename: "index.html"
		})
	]
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);