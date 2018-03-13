const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = Merge(CommonConfig, {
    output: {
        path: path.join(__dirname, "./public")
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'production'"
            }
        }),
        new UglifyJsPlugin()
    ]
});