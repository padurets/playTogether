const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDevelop = process.env.NODE_ENV !== "production";
const webpackCommonConfig = {
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: ["style-loader"],
					use: [{
							loader: "typings-for-css-modules-loader",
							options: {
								localIdentName: isDevelop ? "[name]-[local]-[hash:3]" : "[hash:10]",
								modules: true,
								namedExport: true
							}
						},
						"postcss-loader"
					]
				})
			},
			{
				test: /\.pug$/,
				loader: "pug-loader"
			},

			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(ico|jpg|svg|jpeg|png|gif)(\?.*)?$/,
				loader: "file-loader?name=img/[hash].[ext]"
			},
			{
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: "file-loader?context=src/&name=fonts/[hash].[ext]"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("main.css")
	],
	externals: [{
		window: "window"
	}]
};

module.exports = webpackCommonConfig;