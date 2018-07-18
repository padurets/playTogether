const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require("webpack-merge");
const webpackCommonConfig = require("../webpack.common.js");
const dirSrc = path.resolve(__dirname, './src');
const dirDist = path.resolve(__dirname, './dist');

const webpackDevConfig = {
    watch: true,
    target: 'node',
    devtool: 'cheap-source-map',
    entry: `${dirSrc}/app.ts`,
    mode: 'development',
    externals: [nodeExternals()],
    output: {
        path: dirDist,
        filename: "index.js",
        // publicPath: `/`
    },
};

module.exports = merge(webpackCommonConfig, webpackDevConfig);