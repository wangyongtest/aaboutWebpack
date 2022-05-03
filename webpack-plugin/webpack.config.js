const path = require("path");
const DonePlugin = require('./plugins/done-plugin')
const DunPlugin = require('./plugins/run-plugin')
module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js'
  },
  
  module:{
    rules:[
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders', 'loader1.js'),
          path.resolve(__dirname, 'loaders', 'loader2.js')
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins:[
    new DunPlugin(),
    new DonePlugin()
  ]
};
