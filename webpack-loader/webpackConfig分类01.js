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
        // use: [
        //   {
        //     /**
        //      * 1、这里可以使用绝对路径方式
        //      * 2、配置过 resolveLoader 之后 就可以像其他loader一样使用
        //      * **/
        //     // loader: "babel-loader",】
        //     // loader: path.resolve(__dirname, 'loaders/test-loader.js'),
        //     loader: "test-loader",
        //     options: {
        //       presets: ["@babel/preset-env"]
        //     }
        //   }
        // ]

        // 2、查看 loader执行顺序
        use:['normal-loader'],
      },
      {
        test: /\.js$/,
        use:['post-loader'],
        // 配置loader为前置还是后置， 不添加的话会 从右往左
        enforce: 'post',
      },
      {
        test: /\.js$/,
        use:['prev-loader'],
        enforce: 'pre',
      },
      {
        test:/\.js$/,
        use:['inline-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
