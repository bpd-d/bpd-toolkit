"use strict";
var path = require("path");
const setPath = function (folderName) {
	return path.join(__dirname, folderName);
};
const isProd = function () {
	return process.env.NODE_ENV === "production" ? true : false;
};
module.exports = {
	mode: isProd ? "production" : "development",
	devtool: "source-map",
	optimization: {
		runtimeChunk: false,
		splitChunks: {
			chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
		},
	},
	resolveLoader: {
		modules: [setPath("node_modules")],
	},
	devServer: {
		historyApiFallback: true,
		noInfo: false,
	},
	entry: {
		tools: "./src/index.ts",
		collection: "./src/collection",
		colors: "./src/colors.ts",
		copy: "./src/copy.ts",
		location: "./src/location.ts",
		lock: "./src/lock.ts",
		queue: "./src/queue.ts",
		switch: "./src/switch.ts",
		task: "./src/task.ts",
		validator: "./src/validator.ts",
		expressions: "./src/expressions.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bpdToolkit.[name].js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd",
		library: ["bpdToolkit", "[name]"],
		umdNamedDefine: true,
	},
	plugins: [],
};
