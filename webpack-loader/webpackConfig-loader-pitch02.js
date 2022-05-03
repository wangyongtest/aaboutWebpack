const HtmlWebpackPlugin = require("html-webpack-plugin");
const testLoader = require("../loaders/test-loader");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {},
  resolveLoader: {
    // 先在当前目录下的loaders中找，再去  node_modules中找
    modules: [path.resolve(__dirname, "loaders"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use:['post-loader', 'inline-loader', 'normal-loader', 'pre-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
