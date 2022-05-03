const path = require("path");
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
};
