var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		runtimeChunk: false,
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					sourceMap: true,
				},
				extractComments: false,
			}),
		],
	},
	output: {
		filename: "bpdToolkit.[name].min.js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd",
		library: ["bpdToolkit", "[name]"],
		umdNamedDefine: true,
	},
});
